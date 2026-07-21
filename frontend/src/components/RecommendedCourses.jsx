import React from 'react';
import { Link } from 'react-router-dom';
import { recommendedCourses as fallback } from '../data/mockData';
import { Sparkles, PenTool, Terminal, Users, ArrowRight } from 'lucide-react';

const iconMap = {
  PenTool,
  Terminal,
  Users
};

const RecommendedCourses = ({ courses }) => {
  const list = courses || fallback;

  const getCardStyling = (course) => {
    if (course.iconColor.includes('rose') || course.iconColor.includes('pink')) {
      return {
        cardBg: 'bg-gradient-to-br from-rose-50/30 to-white',
        iconBg: 'bg-rose-100',
        iconColor: 'text-rose-600',
        badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
      };
    } else if (course.iconColor.includes('green') || course.iconColor.includes('emerald')) {
      return {
        cardBg: 'bg-gradient-to-br from-emerald-50/30 to-white',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
      };
    } else {
      return {
        cardBg: 'bg-gradient-to-br from-amber-50/30 to-white',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
      };
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Recommended for You</h2>
        <p className="text-sm text-gray-500">AI-powered course suggestions based on your learning DNA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {list.map((course) => {
          const CourseIcon = iconMap[course.icon] || PenTool;
          const styling = getCardStyling(course);

          return (
            <div
              key={course.id}
              className={`${styling.cardBg} rounded-xl border border-premium p-5 sm:p-6 card-interactive shadow-premium`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styling.iconBg}`}>
                  <CourseIcon className={`w-6 h-6 ${styling.iconColor}`} strokeWidth={1.5} />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${styling.badgeColor}`}>
                  {course.badge}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg leading-snug group-hover:text-gray-700 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{course.subtitle}</p>

              <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1">Why this is recommended</p>
                <p className="text-xs text-gray-700 leading-relaxed">{course.reason}</p>
              </div>

              <Link
                to="/course"
                className="w-full flex items-center justify-center gap-2 px-6 sm:px-4 py-4 sm:py-2.5 text-white rounded-xl font-semibold btn-press-scale text-base sm:text-sm shadow-md"
                style={{background: '#4EC0F4'}}
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedCourses;
