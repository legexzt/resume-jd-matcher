'use client';

import React, { useState } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../lib/llm/types';

interface UploadFormProps {
  onResult: (result: AnalysisResult) => void;
  onError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export function UploadForm({ onResult, onError, setLoading, isLoading }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== 'application/pdf') {
        onError('Please select a PDF file.');
        return;
      }
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      onError('Please upload a resume.');
      return;
    }
    if (jd.length < 100) {
      onError('Job description must be at least 100 characters.');
      return;
    }

    setLoading(true);
    onError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jd', jd);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'An error occurred during analysis.');
      }

      onResult(data as AnalysisResult);
    } catch (err: any) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resume (PDF)</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex items-center text-slate-700">
                <FileText className="w-6 h-6 mr-2 text-slate-500" />
                <span className="font-medium">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                <span>Click or drag PDF here to upload</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Job Description
            <span className="text-slate-400 font-normal ml-2">({jd.length} chars)</span>
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none text-slate-700"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
            Analyzing Match...
          </>
        ) : (
          'Analyze Match'
        )}
      </button>
    </form>
  );
}
