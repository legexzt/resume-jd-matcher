import { describe, it, expect, vi } from 'vitest';
import { extractTextFromPdf } from '../lib/pdf/extract';
import * as pdfParseModule from 'pdf-parse';

// Mock pdf-parse
vi.mock('pdf-parse', () => {
  return {
    default: vi.fn((buffer: Buffer) => {
      if (buffer.length === 0) {
        throw new Error('Empty buffer');
      }
      if (buffer.toString() === 'corrupt') {
        throw new Error('Corrupt PDF');
      }
      return Promise.resolve({ text: 'Extracted PDF text' });
    })
  };
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
});
