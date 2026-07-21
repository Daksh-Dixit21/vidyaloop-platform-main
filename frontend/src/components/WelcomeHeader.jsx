import React from 'react';
import { userData as fallback } from '../data/mockData';
import { Flame, Clock, TrendingUp } from 'lucide-react';

const WelcomeHeader = ({ userInfo }) => {
  const data = userInfo || fallback;
  const { name, class: className, school, stats } = data;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-2">Good morning</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {name}! 👋
          </h1>
          <p className="text-base text-gray-600">{className} · {school}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl px-4 py-4 border border-premium shadow-premium hover:shadow-premium-md color-transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.streak}</span>
              <p className="text-xs text-gray-600 font-medium">day streak</p>
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-4 border border-premium shadow-premium hover:shadow-premium-md color-transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.hoursThisWeek}h</span>
              <p className="text-xs text-gray-600 font-medium">this week</p>
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-4 border border-premium shadow-premium hover:shadow-premium-md color-transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold text-gray-900">{stats.ranking}</span>
              <p className="text-xs text-gray-600 font-medium">ranking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
