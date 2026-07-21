import React from 'react';
import { Link } from 'react-router-dom';
import { continueLearnig as fallback } from '../data/mockData';
import { ArrowRight, Calculator } from 'lucide-react';

const ContinueLearning = ({ data }) => {
  const d = data || fallback;

  return (
    <Link
      to="/course"
      className="block bg-white rounded-2xl border border-premium p-6 sm:p-8 shadow-premium card-interactive"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">Continue Learning</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{d.title}</h2>
          <p className="text-base text-gray-600 mt-1">{d.module}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
            d.iconColor?.includes('cyan') ? 'bg-cyan-50' :
            d.iconColor?.includes('indigo') ? 'bg-indigo-50' :
            'bg-purple-50'
          }`}>
            <Calculator className={`w-8 h-8 ${
              d.iconColor?.includes('cyan') ? 'text-cyan-600' :
              d.iconColor?.includes('indigo') ? 'text-indigo-600' :
              'text-purple-600'
            }`} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${d.progress}%`,
              background: '#4EC0F4'
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">{d.progress}% complete</p>
          <div className="flex items-center gap-1.5 text-gray-600 group-hover:text-gray-900 transition-colors">
            <span className="text-sm font-medium">Continue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContinueLearning;
