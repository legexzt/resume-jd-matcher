// pdf-parse v2 is a CommonJS package exposing the PDFParse class (the v1
// callable-function API was removed). Dynamic import avoids Turbopack's strict
// static analysis of its ESM entry point, and lets Vitest intercept via vi.mock.
async function loadPdfParse() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (await import('pdf-parse')) as any;
  // The class is exposed as a named export under CJS/ESM interop.
  const PDFParse = mod.PDFParse ?? mod.default?.PDFParse;
  if (typeof PDFParse !== 'function') {
    throw new Error('pdf-parse did not export the PDFParse class');
  }
  return PDFParse as new (options: { data: Buffer }) => {
    getText(): Promise<{ text: string }>;
  };
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error('PDF buffer is empty or invalid');
  }

  const PDFParse = await loadPdfParse();

  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const text = result?.text ?? '';
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
