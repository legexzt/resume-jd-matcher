import { describe, it, expect, vi } from 'vitest';
import { extractTextFromPdf } from '../lib/pdf/extract';

// pdf-parse v2 exposes the PDFParse class (not a callable function).
// We mock the module with a PDFParse class whose getText() resolves or rejects
// based on the buffer contents, matching the real package's shape.
vi.mock('pdf-parse', () => {
  class PDFParse {
    private data: Buffer;
    constructor(options: { data: Buffer }) {
      this.data = options.data;
    }
    getText() {
      if (this.data.toString() === 'corrupt') {
        return Promise.reject(new Error('Corrupt PDF'));
      }
      if (this.data.toString() === 'empty-text') {
        return Promise.resolve({ text: '   ' });
      }
      return Promise.resolve({ text: 'Extracted PDF text' });
    }
  }
  return { PDFParse };
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
