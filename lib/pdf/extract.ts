// pdf-parse v1 is a CommonJS package whose module.exports is the parse
// function itself. Dynamic import avoids Turbopack's strict static analysis
// of its entry point, and lets Vitest intercept via vi.mock.
async function loadPdfParse() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (await import('pdf-parse')) as any;
  // Under CJS/ESM interop the callable is exposed as .default, otherwise the
  // module itself is the function.
  const fn = mod.default ?? mod;
  if (typeof fn !== 'function') {
    throw new Error('pdf-parse did not export a callable function');
  }
  return fn as (buffer: Buffer) => Promise<{ text: string }>;
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error('PDF buffer is empty or invalid');
  }

  const pdfParse = await loadPdfParse();

  try {
    const data = await pdfParse(buffer);
    const text = data?.text ?? '';
    if (text.trim().length === 0) {
      throw new Error('PDF contains no extractable text');
    }
    return text;
  } catch (error: any) {
    if (error.message === 'PDF contains no extractable text') {
      throw error;
    }
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}
