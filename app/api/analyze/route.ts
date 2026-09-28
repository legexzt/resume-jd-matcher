import { NextRequest, NextResponse } from 'next/server';
import { runAnalysis } from '../../../lib/analysis';
import { ConfigurationError } from '../../../lib/llm/provider';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const resumeFile = formData.get('resume') as File | null;
    const jdText = formData.get('jd') as string | null;

    if (!resumeFile) {
      return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
    }

    if (resumeFile.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Resume must be a PDF file' }, { status: 400 });
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Resume file must be less than 5MB' }, { status: 400 });
    }

    if (!jdText || typeof jdText !== 'string' || jdText.length < 100) {
      return NextResponse.json({ error: 'Job description must be at least 100 characters' }, { status: 400 });
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const result = await runAnalysis(buffer, jdText);

    return NextResponse.json(result);
  } catch (error: any) {
    if (error instanceof ConfigurationError) {
      return NextResponse.json(
        { error: 'Service not configured: AWS credentials are missing. Contact the site administrator.' },
        { status: 503 }
      );
    }
    
    if (error.message && error.message.includes('PDF')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
