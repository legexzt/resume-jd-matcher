'use client';

import React, { useState } from 'react';
import { UploadForm } from '../components/UploadForm';
import { ResultsPanel } from '../components/ResultsPanel';
import { AnalysisResult } from '../lib/llm/types';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Resume Match Analyzer
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Upload your resume and the job description to get a tailored analysis and actionable feedback.
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <UploadForm 
          onResult={setResult} 
          onError={setError} 
          setLoading={setIsLoading} 
          isLoading={isLoading} 
        />

        {result && !isLoading && (
          <ResultsPanel result={result} />
        )}
      </div>
    </main>
  );
}
