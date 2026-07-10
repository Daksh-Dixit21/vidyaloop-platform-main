import React from 'react';
import { Link } from 'react-router-dom';
import { aiRecommendation } from '../data/mockData';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

const AIRecommendation = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl border-2 border-indigo-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
      
      <div className="relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-shrink-0">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-2xl shadow-lg animate-pulse-slow">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 bg-clip-text text-transparent">
              {aiRecommendation.title}
            </h3>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">{aiRecommendation.message}</p>
        </div>
      </div>
      
      <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6 sm:mt-4">
        {aiRecommendation.actions.map((action) => (
          <Link
            key={action.label}
            to={action.link}
            className={`group flex items-center justify-center gap-2 px-6 sm:px-4 py-4 sm:py-3 rounded-xl font-semibold btn-press-scale text-base sm:text-sm ${
              action.label === aiRecommendation.actions[0].label
                ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-300 shadow-sm'
            }`}
          >
            <span>{action.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendation;
