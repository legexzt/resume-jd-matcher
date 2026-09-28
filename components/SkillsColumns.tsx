import React from 'react';

interface SkillsColumnsProps {
  matchedSkills: string[];
  missingSkills: string[];
}

export function SkillsColumns({ matchedSkills, missingSkills }: SkillsColumnsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Skills Found
        </h3>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500 italic text-sm">None identified</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          Skills to Add
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500 italic text-sm">None identified</p>
          )}
        </div>
      </div>
    </div>
  );
}
