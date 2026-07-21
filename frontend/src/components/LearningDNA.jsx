import React from 'react';
import { learningDNA as fallback } from '../data/mockData';
import SkillBar from './SkillBar';
import { Sparkles } from 'lucide-react';

const LearningDNA = ({ strengths, weaknesses }) => {
  const s = strengths || fallback.strengths;
  const w = weaknesses || fallback.weaknesses;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Learning DNA</h2>
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-medium rounded-full flex items-center gap-1 border border-blue-200">
          <Sparkles className="w-3 h-3" />
          AI-Analyzed
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 sm:mb-4">Your Strengths</h3>
          <div className="space-y-3 sm:space-y-4">
            {s.map((skill) => (
              <SkillBar key={skill.name} {...skill} color="bg-green-600" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 sm:mb-4">Areas to Improve</h3>
          <div className="space-y-3 sm:space-y-4">
            {w.map((skill) => (
              <SkillBar key={skill.name} {...skill} color="bg-blue-400" />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 sm:mt-4 italic">
            We've tailored your recommendations to address these areas
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningDNA;
