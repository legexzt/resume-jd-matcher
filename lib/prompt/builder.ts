export function buildPrompt(resumeText: string, jobDescription: string): string {
  return `You are an expert technical recruiter and resume writer. I am going to provide you with a candidate's resume and a job description.

Your task is to analyze how well the resume matches the job description, compute scores, extract skills, and provide concrete bullet rewrites.

CRITICAL CONSTRAINT: When providing bullet rewrites, you must ONLY restate information actually present in the resume. You are absolutely forbidden to invent experience, fabricate projects, or add skills the candidate does not have. The suggestions should pick actual resume bullets and show how to reframe them using JD language without adding fabricated content. Do not give generic advice. Provide concrete, rewritten versions of existing bullets.

Please output your response strictly as a JSON object matching the following structure:
{
  "score": number, // Overall integer score 0-100
  "breakdown": {
    "skillsMatch": number, // 0-100 score based on skill overlap %
    "keywordCoverage": number, // 0-100 score based on JD keyword presence in resume
    "experienceRelevance": number // 0-100 score based on LLM-judged relevance of experience
  },
  "matchedSkills": ["skill1", "skill2"], // Skills present in both resume and JD
  "missingSkills": ["skill3", "skill4"], // Skills required by JD but missing in resume
  "suggestions": [
    {
      "originalBullet": "The exact bullet point from the resume",
      "rewrittenBullet": "The improved bullet point using JD language (DO NOT INVENT DETAILS)",
      "reason": "Why this rewrite is better for this JD"
    }
  ]
}

Only return the JSON object, nothing else.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;
}
