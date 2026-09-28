import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { LLMProvider, AnalysisResult } from "./types";
import { buildPrompt } from "../prompt/builder";

export class BedrockProvider implements LLMProvider {
  private client: BedrockRuntimeClient;

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async analyze(resumeText: string, jobDescription: string): Promise<AnalysisResult> {
    const prompt = buildPrompt(resumeText, jobDescription);

    const payload = {
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.1, // Low temperature for more deterministic output
    };

    try {
      const command = new InvokeModelCommand({
        modelId: "us.moonshotai.kimi-k3",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
      });

      const response = await this.client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      const content = responseBody.choices?.[0]?.message?.content || responseBody.content?.[0]?.text;
      
      if (!content) {
        throw new Error("Invalid response format from Bedrock model");
      }

      // Extract JSON in case there's markdown around it
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonString) as AnalysisResult;
    } catch (error: any) {
      throw new Error(`Bedrock API Error: ${error.message}`);
    }
  }
}
