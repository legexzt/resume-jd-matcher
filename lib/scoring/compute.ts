export function computeScore(params: { skillsMatch: number, keywordCoverage: number, experienceRelevance: number }): number {
  const { skillsMatch, keywordCoverage, experienceRelevance } = params;
  
  const score = (skillsMatch * 0.40) + (keywordCoverage * 0.35) + (experienceRelevance * 0.25);
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function computeSkillsMatchScore(matched: number, total: number): number {
  if (total === 0) return 100; // If no skills required, it's a match.
  const score = (matched / total) * 100;
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function computeKeywordCoverage(resumeText: string, jdText: string): number {
  if (!resumeText || !jdText) return 0;
  
  // Basic implementation: extract words from JD, check how many appear in resume
  const extractWords = (text: string) => {
    return Array.from(new Set(
      text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3) // Ignore short words
    ));
  };

  const jdWords = extractWords(jdText);
  if (jdWords.length === 0) return 100;

  const resumeWords = extractWords(resumeText);
  const resumeSet = new Set(resumeWords);

  let matchCount = 0;
  for (const word of jdWords) {
    if (resumeSet.has(word)) {
      matchCount++;
    }
  }

  const score = (matchCount / jdWords.length) * 100;
  return Math.min(100, Math.max(0, Math.round(score)));
}
