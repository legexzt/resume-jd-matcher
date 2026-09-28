import React from 'react';
import { AnalysisResult } from '../lib/llm/types';
import { ScoreDisplay } from './ScoreDisplay';
import { SkillsColumns } from './SkillsColumns';
import { SuggestionCard } from './SuggestionCard';

interface ResultsPanelProps {
  result: AnalysisResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto mt-8">
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Match Score</h2>
        <ScoreDisplay score={result.score} breakdown={result.breakdown} />
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Skills Analysis</h2>
        <SkillsColumns 
          matchedSkills={result.matchedSkills} 
          missingSkills={result.missingSkills} 
        />
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bullet Rewrites</h2>
        <div className="space-y-4">
          {result.suggestions && result.suggestions.length > 0 ? (
            result.suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                originalBullet={suggestion.originalBullet}
                rewrittenBullet={suggestion.rewrittenBullet}
                reason={suggestion.reason}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 shadow-sm">
              No specific rewrites suggested.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
