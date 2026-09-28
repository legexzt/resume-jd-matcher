import { describe, it, expect, vi } from 'vitest';
import { extractTextFromPdf } from '../lib/pdf/extract';

// pdf-parse v1 is a CJS module whose module.exports is the parse function itself.
// We mock the entire module as a callable so that require('pdf-parse') returns
// a function, matching the real package's shape.
vi.mock('pdf-parse', () => {
  const parseFn = vi.fn((buffer: Buffer) => {
    if (buffer.toString() === 'corrupt') {
      return Promise.reject(new Error('Corrupt PDF'));
    }
    if (buffer.toString() === 'empty-text') {
      return Promise.resolve({ text: '   ' });
    }
    return Promise.resolve({ text: 'Extracted PDF text' });
  });
  // Vitest resolves CJS interop: the default export IS the function
  return { default: parseFn };
});

describe('pdf-extract', () => {
  it('should return text for a valid PDF buffer', async () => {
    const buffer = Buffer.from('dummy pdf data');
    const text = await extractTextFromPdf(buffer);
    expect(text).toBe('Extracted PDF text');
  });

  it('should throw an error for an empty buffer', async () => {
    const buffer = Buffer.from('');
    await expect(extractTextFromPdf(buffer)).rejects.toThrow('PDF buffer is empty or invalid');
  });

  it('should throw an error for a corrupt buffer', async () => {
    const buffer = Buffer.from('corrupt');
    await expect(extractTextFromPdf(buffer)).rejects.toThrow('Failed to extract text from PDF');
  });

  it('should throw an error when the PDF has no extractable text', async () => {
    const buffer = Buffer.from('empty-text');
    await expect(extractTextFromPdf(buffer)).rejects.toThrow('PDF contains no extractable text');
  });
});
