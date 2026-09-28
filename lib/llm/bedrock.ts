import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
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

    try {
      const command = new ConverseCommand({
        modelId: "us.moonshotai.kimi-k3",
        messages: [
          {
            role: "user",
            content: [{ text: prompt }],
          },
        ],
        inferenceConfig: {
          maxTokens: 4000,
          temperature: 0.1, // Low temperature for more deterministic output
        },
      });

      const response = await this.client.send(command);

      const content = (response.output?.message?.content ?? [])
        .map((block) => ("text" in block ? (block as { text: string }).text : ""))
        .join("");

      if (!content) {
        throw new Error("Invalid response format from Bedrock model");
      }

      // Extract JSON in case there's markdown around it
      const jsonMatch =
        content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonString) as AnalysisResult;
    } catch (error: any) {
      throw new Error(`Bedrock API Error: ${error.message}`);
    }
  }
}
