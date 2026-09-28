const CURATED_SKILLS = new Set([
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'go', 'rust',
  'react', 'next.js', 'vue', 'angular', 'svelte', 'node.js', 'express', 'django', 'flask', 'spring',
  'html', 'css', 'tailwind', 'sass', 'less',
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'jenkins', 'github actions',
  'git', 'linux', 'bash',
  'machine learning', 'deep learning', 'ai', 'nlp', 'computer vision', 'data analysis',
  'agile', 'scrum', 'kanban', 'leadership', 'communication', 'problem solving'
]);

export function extractSkills(text: string): string[] {
  if (!text) return [];
  
  const textLower = text.toLowerCase();
  const foundSkills = new Set<string>();

  for (const skill of CURATED_SKILLS) {
    // Simple word boundary regex for matching to avoid partial matches
    // e.g. 'go' shouldn't match 'good'
    // Handling special characters like ++ or # or .
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(textLower)) {
      foundSkills.add(skill);
    }
  }

  return Array.from(foundSkills).sort();
}

export function findMatchedAndMissing(resumeSkills: string[], jdSkills: string[]): { matched: string[], missing: string[] } {
  const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase()));
  const jdSet = new Set(jdSkills.map(s => s.toLowerCase()));
  
  const matched: string[] = [];
  const missing: string[] = [];

  for (const skill of jdSet) {
    if (resumeSet.has(skill)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  return { matched: matched.sort(), missing: missing.sort() };
}
