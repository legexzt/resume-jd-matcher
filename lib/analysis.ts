import { extractTextFromPdf } from './pdf/extract';
import { getProvider } from './llm/provider';
import { AnalysisResult } from './llm/types';

export async function runAnalysis(resumeBuffer: Buffer, jobDescription: string): Promise<AnalysisResult> {
  const resumeText = await extractTextFromPdf(resumeBuffer);
  
  const provider = getProvider(); // Will throw ConfigurationError if missing env vars
  
  const result = await provider.analyze(resumeText, jobDescription);
  
  // Validate response shape
  if (typeof result.score !== 'number' || result.score < 0 || result.score > 100) {
    throw new Error('Invalid score in analysis result');
  }
  
  if (!result.breakdown || 
      typeof result.breakdown.skillsMatch !== 'number' ||
      typeof result.breakdown.keywordCoverage !== 'number' ||
      typeof result.breakdown.experienceRelevance !== 'number') {
    throw new Error('Invalid breakdown in analysis result');
  }

  if (!Array.isArray(result.matchedSkills) || !Array.isArray(result.missingSkills)) {
    throw new Error('Invalid skills arrays in analysis result');
  }

  if (!Array.isArray(result.suggestions)) {
    throw new Error('Invalid suggestions array in analysis result');
  }

  return result;
}
