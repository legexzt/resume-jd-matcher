import { describe, it, expect } from 'vitest';
import { computeScore, computeSkillsMatchScore, computeKeywordCoverage } from '../lib/scoring/compute';

describe('score-compute', () => {
  it('should compute overall score correctly with weights', () => {
    // 40% skills (100 * 0.4 = 40)
    // 35% keywords (100 * 0.35 = 35)
    // 25% experience (100 * 0.25 = 25)
    // Total: 100
    expect(computeScore({ skillsMatch: 100, keywordCoverage: 100, experienceRelevance: 100 })).toBe(100);
    expect(computeScore({ skillsMatch: 0, keywordCoverage: 0, experienceRelevance: 0 })).toBe(0);
    
    // 40 * 0.4 = 16
    // 60 * 0.35 = 21
    // 80 * 0.25 = 20
    // Total: 57
    expect(computeScore({ skillsMatch: 40, keywordCoverage: 60, experienceRelevance: 80 })).toBe(57);
  });

  it('should compute skills match score', () => {
    expect(computeSkillsMatchScore(0, 10)).toBe(0);
    expect(computeSkillsMatchScore(5, 10)).toBe(50);
    expect(computeSkillsMatchScore(10, 10)).toBe(100);
    expect(computeSkillsMatchScore(0, 0)).toBe(100); // No required skills
  });

  it('should compute keyword coverage', () => {
    const resumeText = 'Experienced developer using javascript and python';
    const jdText = 'We need a developer who knows javascript, python, and aws';
    
    // jdText words (len > 3): need, developer, knows, javascript, python
    // jd words length = 5
    // resume matches: developer, javascript, python (3)
    // score = 3 / 5 = 60%
    const score = computeKeywordCoverage(resumeText, jdText);
    expect(score).toBe(60);
    
    expect(computeKeywordCoverage('nothing relevant', 'something else completely')).toBe(0);
    expect(computeKeywordCoverage('all words match perfectly here', 'all words match perfectly here')).toBe(100);
  });
});
