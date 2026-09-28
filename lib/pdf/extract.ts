// pdf-parse is a CommonJS package. Dynamic import avoids Turbopack's strict
// static analysis of its ESM entry point, and lets Vitest intercept via vi.mock.
async function loadPdfParse() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (await import('pdf-parse')) as any;
  // The callable is exposed as .default under CJS/ESM interop, or as the module itself.
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
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('PDF contains no extractable text');
    }
    return data.text;
  } catch (error: any) {
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

