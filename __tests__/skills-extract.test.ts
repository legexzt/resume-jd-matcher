import { describe, it, expect } from 'vitest';
import { extractSkills, findMatchedAndMissing } from '../lib/skills/extract';

describe('skills-extract', () => {
  it('should extract deduplicated, sorted skills', () => {
    const text = 'I know Python, python, Java, and React. React is great.';
    const skills = extractSkills(text);
    expect(skills).toEqual(['java', 'python', 'react']);
  });

  it('should handle case-insensitive matching', () => {
    const text = 'I use NEXT.JS and typescript daily.';
    const skills = extractSkills(text);
    expect(skills).toEqual(['next.js', 'typescript']);
  });

  it('should separate matched and missing skills correctly', () => {
    const resumeSkills = ['python', 'java', 'react'];
    const jdSkills = ['python', 'sql', 'aws'];
    
    const result = findMatchedAndMissing(resumeSkills, jdSkills);
    
    expect(result.matched).toEqual(['python']);
    expect(result.missing).toEqual(['aws', 'sql']); // Should be sorted
  });
});
