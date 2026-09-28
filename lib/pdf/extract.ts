export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const pdfParse = require('pdf-parse');
  if (!buffer || buffer.length === 0) {
    throw new Error('PDF buffer is empty or invalid');
  }

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
