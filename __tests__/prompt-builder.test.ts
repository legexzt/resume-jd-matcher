import { describe, it, expect } from 'vitest';
import { buildPrompt } from '../lib/prompt/builder';

describe('prompt-builder', () => {
  it('should return a string containing both resume and JD', () => {
    const resume = 'My Resume Content';
    const jd = 'My JD Content';
    
    const prompt = buildPrompt(resume, jd);
    
    expect(prompt).toContain(resume);
    expect(prompt).toContain(jd);
  });

  it('should explicitly forbid invention of experience', () => {
    const prompt = buildPrompt('test', 'test');
    
    expect(prompt.toLowerCase()).toContain('invent experience');
    expect(prompt.toLowerCase()).toContain('fabricate');
    expect(prompt.toLowerCase()).toContain('only restate');
  });

  it('should return a non-empty string of reasonable length', () => {
    const prompt = buildPrompt('a', 'b');
    expect(typeof prompt).toBe('string');
    expect(prompt.length).toBeGreaterThan(100);
  });
});
