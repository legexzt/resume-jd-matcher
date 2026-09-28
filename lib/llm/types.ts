export interface AnalysisResult {
  score: number;
  breakdown: {
    skillsMatch: number;
    keywordCoverage: number;
    experienceRelevance: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: Array<{
    originalBullet: string;
    rewrittenBullet: string;
    reason: string;
  }>;
}

export interface LLMProvider {
  analyze(resumeText: string, jobDescription: string): Promise<AnalysisResult>;
}
