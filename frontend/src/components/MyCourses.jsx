import React from 'react';
import { Link } from 'react-router-dom';
import { myCourses } from '../data/mockData';
import CourseCard from './CourseCard';
import { ArrowRight } from 'lucide-react';

const MyCourses = () => {
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Courses</h2>
          <p className="text-sm text-gray-500 mt-1">{myCourses.length} courses in progress</p>
        </div>
        <Link
          to="/course"
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Course Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {myCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
