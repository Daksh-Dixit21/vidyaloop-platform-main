import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Search, Code, Cpu, Bot, Calculator, Zap, Rocket, Download, CheckCircle } from 'lucide-react';

const CourseBrowse = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('courses');

  const categories = [
    { id: 'all', label: 'All Courses', icon: Rocket },
    { id: 'coding', label: 'Coding', icon: Code },
    { id: 'ai', label: 'Artificial Intelligence', icon: Cpu },
    { id: 'robotics', label: 'Robotics', icon: Bot },
    { id: 'mathematics', label: 'Mathematics', icon: Calculator },
    { id: 'science', label: 'Science Experiments', icon: Zap }
  ];

  const courses = [
    {
      id: 1,
      title: "Python Programming Basics",
      description: "Learn the fundamentals of Python programming with hands-on projects",
      whatYouLearn: "Master Python syntax, control structures, and build real programs",
      outcome: "Build 5+ coding projects and solve real-world problems",
      duration: "8 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "High Demand Skill"],
      skills: ["Python", "Problem Solving", "Logic"],
      category: "coding",
      icon: Code,
      iconBg: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Web Development with JavaScript",
      description: "Build modern web applications using JavaScript and React",
      whatYouLearn: "Create interactive websites and dynamic web applications",
      outcome: "Launch your own portfolio website and web apps",
      duration: "10 weeks",
      level: "Intermediate",
      tags: ["Project-Based", "High Demand Skill"],
      skills: ["JavaScript", "HTML/CSS", "React"],
      category: "coding",
      icon: Code,
      iconBg: "from-blue-100 to-cyan-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Introduction to Machine Learning",
      description: "Dive into machine learning concepts and build your first AI models",
      whatYouLearn: "Train AI models and understand machine learning algorithms",
      outcome: "Build predictive models and data-driven applications",
      duration: "12 weeks",
      level: "Intermediate",
      tags: ["Project-Based", "High Demand Skill"],
      skills: ["Python", "ML Algorithms", "Data Science"],
      category: "ai",
      icon: Cpu,
      iconBg: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "AI for Kids: Fun with ChatGPT",
      description: "Explore artificial intelligence through interactive ChatGPT projects",
      whatYouLearn: "Understand AI basics and create AI-powered projects",
      outcome: "Build creative AI projects and improve problem-solving",
      duration: "6 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "Project-Based"],
      skills: ["AI Basics", "Prompt Engineering", "Ethics"],
      category: "ai",
      icon: Cpu,
      iconBg: "from-purple-100 to-indigo-100",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      title: "Build Your First Robot",
      description: "Design, build, and program your own robot from scratch",
      whatYouLearn: "Design, assemble, and program a functioning robot",
      outcome: "Build a working robot and learn hardware programming",
      duration: "10 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "Project-Based"],
      skills: ["Arduino", "Sensors", "Motors"],
      category: "robotics",
      icon: Bot,
      iconBg: "from-green-100 to-emerald-100",
      iconColor: "text-green-600"
    },
    {
      id: 6,
      title: "Algebra Made Easy",
      description: "Strengthen your algebra foundation with step-by-step guidance",
      whatYouLearn: "Master equations, polynomials, and algebraic thinking",
      outcome: "Improve problem-solving and excel in math",
      duration: "8 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly"],
      skills: ["Equations", "Polynomials", "Graphing"],
      category: "mathematics",
      icon: Calculator,
      iconBg: "from-orange-100 to-amber-100",
      iconColor: "text-orange-600"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Tab Switch */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'courses'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'courses' ? {background: '#4EC0F4'} : {}}
            >
              STEM Courses
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'certificate'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'certificate' ? {background: '#4EC0F4'} : {}}
            >
              Sample Certificate
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'courses' ? (
          <>
            {/* Header Section with subtle gradient background */}
            <div className="mb-6 pb-6 sm:pb-8 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="text-blue-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Good morning</div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Explore STEM Courses</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-1 sm:mb-2">Build future-ready skills in Coding, AI, Robotics, and more</p>
              <p className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-1 sm:gap-2">
                <span>Learn</span>
                <span className="text-cyan-600">→</span>
                <span>Build</span>
                <span className="text-cyan-600">→</span>
                <span>Apply in real-world projects</span>
              </p>
              
              {/* Search Bar */}
              <div className="mt-4 sm:mt-6 w-full sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all bg-white text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Why Learn STEM Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Why learn STEM?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Build real-world skills</h3>
                    <p className="text-xs text-gray-600">Master in-demand technologies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Improve logical thinking</h3>
                    <p className="text-xs text-gray-600">Develop problem-solving abilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Prepare for future careers</h3>
                    <p className="text-xs text-gray-600">Unlock high-growth opportunities</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Browse by Category */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">Browse by Category</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All STEM Courses */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All STEM Courses' : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="text-gray-500 font-medium text-sm sm:text-base">{filteredCourses.length} courses</span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course) => {
              const Icon = course.icon;
              
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Icon and Level Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${course.iconColor}`} />
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                      course.level === 'Beginner' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : course.level === 'Intermediate'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {course.title}
                  </h3>

                  {/* Tags */}
                  {course.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded text-xs font-medium border border-cyan-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* What You'll Learn */}
                  {course.whatYouLearn && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">What you'll learn:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {course.whatYouLearn}
                      </p>
                    </div>
                  )}

                  {/* Outcome - Highlighted on Hover */}
                  {course.outcome && (
                    <div className="mb-4 pb-4 border-b border-gray-100 group-hover:bg-gradient-to-r group-hover:from-cyan-50 group-hover:to-blue-50 group-hover:-mx-2 group-hover:px-2 group-hover:py-3 group-hover:rounded-xl transition-all duration-300">
                      <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <span>Outcome:</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">🎯</span>
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {course.outcome}
                      </p>
                    </div>
                  )}

                  {/* Description - For courses without new fields */}
                  {!course.whatYouLearn && !course.outcome && (
                    <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                      {course.description}
                    </p>
                  )}

                  {/* Duration */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">{course.duration}</span>
                    </div>
                  </div>

                  {/* Skills Covered */}
                  <div className="mb-5">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 hover:shadow-md hover:scale-105 transition-all cursor-pointer"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Start Learning Button */}
                  <button className="w-full py-3.5 text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300" style={{background: '#4EC0F4'}}>
                    Start Learning
                  </button>
                </div>
              );
            })}
          </div>

          {/* No results message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-2">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
        </>
        ) : (
          /* Sample STEM Certificate View */
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sample STEM Certificate</h2>
              <p className="text-gray-600">Preview of your STEM course completion certificate</p>
            </div>

            {/* Certificate Image Container */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-200">
              <div className="relative group">
                <img
                  src="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/6lw7q3so_Vidyaloop_STEM_Certificate_Final.png"
                  alt="Vidyaloop STEM Certificate Sample"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                
                {/* Download Button Overlay - Desktop Only */}
                <div className="hidden md:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/6lw7q3so_Vidyaloop_STEM_Certificate_Final.png"
                    download="Vidyaloop_STEM_Certificate_Sample.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-all shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Download Button Below - Mobile Only */}
              <div className="md:hidden mt-4">
                <a
                  href="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/6lw7q3so_Vidyaloop_STEM_Certificate_Final.png"
                  download="Vidyaloop_STEM_Certificate_Sample.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-all shadow-md active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </a>
              </div>

              {/* Certificate Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">STEM Certified</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Official STEM Track certification</li>
                      <li>• Personalized with your name and course</li>
                      <li>• Downloadable and shareable</li>
                      <li>• Verifiable with unique certificate ID</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CourseBrowse;
