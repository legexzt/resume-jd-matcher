import React from 'react';

interface ScoreDisplayProps {
  score: number;
  breakdown: {
    skillsMatch: number;
    keywordCoverage: number;
    experienceRelevance: number;
  };
}

export function ScoreDisplay({ score, breakdown }: ScoreDisplayProps) {
  const getScoreColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getTextColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
      <div className="flex flex-col items-center justify-center min-w-[150px]">
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Overall Match</div>
        <div className="flex items-baseline">
          <span className={\`text-6xl font-bold \${getTextColor(score)}\`}>{score}</span>
          <span className="text-2xl text-slate-400 ml-1">/ 100</span>
        </div>
      </div>
      
      <div className="flex-1 w-full space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Skills Match</span>
            <span className="text-slate-500">{breakdown.skillsMatch}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className={\`h-2.5 rounded-full \${getScoreColor(breakdown.skillsMatch)}\`} style={{ width: \`\${breakdown.skillsMatch}%\` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Keyword Coverage</span>
            <span className="text-slate-500">{breakdown.keywordCoverage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className={\`h-2.5 rounded-full \${getScoreColor(breakdown.keywordCoverage)}\`} style={{ width: \`\${breakdown.keywordCoverage}%\` }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">Experience Relevance</span>
            <span className="text-slate-500">{breakdown.experienceRelevance}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className={\`h-2.5 rounded-full \${getScoreColor(breakdown.experienceRelevance)}\`} style={{ width: \`\${breakdown.experienceRelevance}%\` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
