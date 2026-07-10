import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Code, Atom } from 'lucide-react';

const iconMap = {
  Calculator,
  Code,
  Atom
};

const CourseCard = ({ course, showModules = true }) => {
  const IconComponent = iconMap[course.icon] || Calculator;

  // Determine color accent based on course
  const getColorAccent = () => {
    if (course.iconColor.includes('emerald') || course.iconColor.includes('green')) {
      return {
        borderTop: 'border-t-emerald-400',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      };
    } else if (course.iconColor.includes('blue') || course.iconColor.includes('indigo')) {
      return {
        borderTop: 'border-t-blue-400',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      };
    } else {
      return {
        borderTop: 'border-t-purple-400',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600'
      };
    }
  };

  const colorAccent = getColorAccent();

  return (
    <Link
      to="/course"
      className={`block bg-white rounded-xl border border-premium border-t-4 ${colorAccent.borderTop} p-5 card-interactive h-full shadow-premium`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorAccent.iconBg}`}>
          <IconComponent className={`w-7 h-7 ${colorAccent.iconColor}`} strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Course Title */}
      <h3 className="font-bold text-gray-900 text-center mb-4 text-sm sm:text-base leading-snug group-hover:text-gray-700 transition-colors">
        {course.title}
      </h3>
      
      {/* Progress */}
      <div className="space-y-2">
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${course.progress}%`,
              background: course.progress >= 70 
                ? 'linear-gradient(to right, #10b981, #059669)' 
                : course.progress >= 40
                ? 'linear-gradient(to right, #33aaff, #1e90ff)'
                : 'linear-gradient(to right, #f59e0b, #d97706)'
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-medium">{course.progress}% complete</span>
          {showModules && (
            <span className="text-xs text-gray-500">{course.modules}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
