import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionCardProps {
  originalBullet: string;
  rewrittenBullet: string;
  reason: string;
}

export function SuggestionCard({ originalBullet, rewrittenBullet, reason }: SuggestionCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col space-y-3">
      <div className="text-slate-500 text-sm line-through decoration-slate-300">
        "{originalBullet}"
      </div>
      <div className="flex items-center text-slate-400">
        <ArrowRight className="w-4 h-4 mr-2" />
        <span className="text-xs uppercase tracking-wide font-medium">Suggested Rewrite</span>
      </div>
      <div className="text-slate-800 font-medium">
        {rewrittenBullet}
      </div>
      <div className="mt-2 pt-3 border-t border-slate-100 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
        <span className="font-medium text-slate-700 mr-2">Why:</span>
        {reason}
      </div>
    </div>
  );
}
