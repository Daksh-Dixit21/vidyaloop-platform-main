import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Play, CheckCircle, MessageCircle, ArrowRight, Clock, BookOpen, Download, GraduationCap, Bell, Rocket, Sparkles } from 'lucide-react';

const LAUNCH_DATE = new Date('2026-05-10T00:00:00').getTime();

const computeTimeLeft = () => {
  const diff = LAUNCH_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
};

const CoursesComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const handleNotify = () => {
    setNotified(true);
    setTimeout(() => setNotified(false), 3500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10" data-testid="courses-coming-soon">
      <div className="relative bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
             style={{background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)'}} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
             style={{background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)'}} />

        <div className="relative p-6 sm:p-12 text-center">
          {/* Illustration */}
          <div className="inline-flex relative mb-6 sm:mb-8">
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-50"
                 style={{background: 'linear-gradient(135deg, #4EC0F4, #8b5cf6)'}} />
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shadow-2xl"
              style={{background: 'linear-gradient(135deg, #4EC0F4 0%, #6366f1 100%)'}}
            >
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.8} />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 drop-shadow-lg" />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-4">
            <Rocket className="w-3.5 h-3.5" style={{color: '#4EC0F4'}} />
            <span className="text-xs font-semibold tracking-wide" style={{color: '#0ea5e9'}}>Launching May 10, 2026</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Courses are Coming Soon{' '}
            <span aria-label="rocket" className="inline-block">🚀</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Launching on May 10th, 2026 — Get ready to explore skill-based learning like never before.
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mb-8 sm:mb-10" data-testid="courses-countdown">
            {units.map((u) => (
              <div
                key={u.label}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl sm:rounded-2xl py-3 sm:py-5 px-1 sm:px-3"
              >
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold tabular-nums leading-none" style={{color: '#4EC0F4'}}>
                  {String(u.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1.5 sm:mt-2">
                  {u.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleNotify}
            disabled={notified}
            className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-90 disabled:scale-100"
            style={{background: '#4EC0F4'}}
            data-testid="courses-notify-me-btn"
          >
            {notified ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>You'll be notified!</span>
              </>
            ) : (
              <>
                <Bell className="w-5 h-5" />
                <span>Notify Me</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Confirmation message */}
          <div
            className={`mt-4 transition-all duration-300 ${
              notified ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
            }`}
            aria-live="polite"
          >
            <p className="text-sm font-medium" style={{color: '#10b981'}}>
              Thanks! We'll email you the moment Courses go live.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course = () => {
  const [currentModule, setCurrentModule] = useState(1);
  const [activeTab, setActiveTab] = useState('course');

  const courseData = {
    title: "Building Emotional Balance",
    subtitle: "Personality Development",
    currentModule: "Module 1 of 8",
    overallProgress: 12,
    completedModules: 1,
    totalModules: 8,
    currentLesson: {
      title: "Introduction to Emotional Balance",
      duration: "10 min",
      lessons: 3
    }
  };

  const modules = [
    { id: 1, label: "Introduction", title: "Introduction to Emotional Balance", duration: "10 min", lessons: 3, completed: true },
    { id: 2, label: "Module 1", title: "Understanding Emotional Balance", duration: "14 min", lessons: 4, completed: false },
    { id: 3, label: "Module 2", title: "Recognizing Emotional Ups and Downs", duration: "15 min", lessons: 4, completed: false },
    { id: 4, label: "Module 3", title: "Managing Emotional Reactions", duration: "16 min", lessons: 4, completed: false },
    { id: 5, label: "Module 4", title: "Maintaining Perspective During Challenges", duration: "15 min", lessons: 4, completed: false },
    { id: 6, label: "Module 5", title: "Developing Healthy Emotional Habits", duration: "14 min", lessons: 4, completed: false },
    { id: 7, label: "Module 6", title: "Strengthening Long-Term Emotional Stability", duration: "16 min", lessons: 4, completed: false },
    { id: 8, label: "Conclusion", title: "Conclusion: Your Emotional Balance Journey", duration: "8 min", lessons: 2, completed: false }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Tab Switch */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl w-full sm:w-fit overflow-x-auto">
            <button
              onClick={() => setActiveTab('course')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'course'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'course' ? {background: '#4EC0F4'} : {}}
            >
              My Learning
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'courses' ? {background: '#4EC0F4'} : {}}
              data-testid="my-learning-courses-tab"
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
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
        {activeTab === 'course' && (
          <>
            {/* Course Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 font-semibold mb-2">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Recommended for you</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
              <p className="text-sm sm:text-base text-gray-600">{courseData.subtitle} · {courseData.currentModule}</p>
            </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Video/Lesson Section - Left Column (2/3 on desktop, full width on mobile) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Enhanced Video Container */}
            <div className="relative group">
              {/* Premium card wrapper with gradient background */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 shadow-2xl">
                {/* Video container */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent"></div>
                  
                  {/* Video placeholder with geometric pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
                    </div>
                    
                    {/* Enhanced Play Button */}
                    <button className="relative z-10 group/play">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-40 group-hover/play:opacity-60 transition-opacity duration-300 scale-150"></div>
                      
                      {/* Main button */}
                      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-full shadow-2xl transform group-hover/play:scale-110 transition-all duration-300">
                        {/* Inner ring */}
                        <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>
                        
                        {/* Play icon */}
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white ml-1 fill-current drop-shadow-lg" />
                        
                        {/* Pulse animation */}
                        <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-blue-400 animate-ping opacity-75"></div>
                      </div>
                    </button>
                  </div>

                  {/* Lesson info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{courseData.currentLesson.duration} · {courseData.currentLesson.lessons} lessons</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                      {courseData.currentLesson.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Premium shimmer effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-700">Overall Progress</h3>
                <span className="text-sm font-bold text-blue-600">{courseData.overallProgress}%</span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${courseData.overallProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {courseData.completedModules} of {courseData.totalModules} modules completed
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Mark as Complete</span>
              </button>
              <button className="flex-1 sm:flex-none px-5 sm:px-6 py-3 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm sm:text-base" style={{background: '#4EC0F4'}}>
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>Ask AI about this lesson</span>
              </button>
            </div>

            {/* Enhanced Up Next */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Up Next</h3>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 hover:shadow-sm transition-shadow cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg font-bold text-blue-600 border border-blue-200 shadow-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Module 1</p>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      Understanding Emotional Balance
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>14 min · 4 lessons</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Enhanced My Notes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">My Notes</h3>
                <span className="text-xs text-gray-500 font-medium">Auto-saved</span>
              </div>
              <div className="relative">
                <textarea
                  className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none text-gray-700 placeholder:text-gray-400 transition-all bg-gray-50 hover:bg-white"
                  placeholder="Take notes about this lesson...&#10;&#10;• Key concepts&#10;• Important formulas&#10;• Questions to review"
                  defaultValue=""
                ></textarea>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
                  <div className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-500 font-medium shadow-sm">
                    Markdown supported
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>All changes saved</span>
              </div>
            </div>
          </div>

          {/* Course Modules - Right Column (1/3 on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Course Modules</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">{courseData.completedModules}/{courseData.totalModules} completed</p>

              <div className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      currentModule === module.id
                        ? 'border-blue-600 bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 shadow-md scale-[1.02]'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {/* Completion indicator */}
                      <div className="flex-shrink-0 mt-0.5">
                        {module.completed ? (
                          <div className="relative">
                            <CheckCircle className="w-5 h-5 text-green-600" fill="currentColor" />
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-30"></div>
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                            currentModule === module.id 
                              ? 'border-blue-600 bg-blue-100' 
                              : 'border-gray-300 bg-white group-hover:border-blue-400'
                          }`}>
                            {currentModule === module.id && (
                              <div className="w-full h-full rounded-full bg-blue-600 scale-50"></div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Module number badge */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                        currentModule === module.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {module.id}
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 transition-colors ${
                          currentModule === module.id ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {module.label}
                        </p>
                        <h4 className={`font-semibold text-sm mb-2 leading-tight transition-colors ${
                          currentModule === module.id ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {module.title}
                        </h4>
                        <div className={`flex items-center gap-1.5 text-xs transition-colors ${
                          currentModule === module.id ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{module.duration} · {module.lessons} lessons</span>
                        </div>
                      </div>
                    </div>

                    {/* Active indicator bar */}
                    {currentModule === module.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-l-xl"></div>
                    )}
                  </button>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-3 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2" style={{background: '#4EC0F4'}}>
                <span>Next Lesson</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </>
        )}

        {/* Courses Tab - Coming Soon */}
        {activeTab === 'courses' && (
          <CoursesComingSoon />
        )}

        {activeTab === 'certificate' && (
          /* Sample Certificate View */
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-5 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sample Certificate</h2>
              <p className="text-sm sm:text-base text-gray-600">Preview of your course completion certificate</p>
            </div>

            {/* Certificate Image Container */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-200">
              <div className="relative group">
                <img
                  src="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/3xxzhc67_Vidyaloop_General_Certificate_Final.png"
                  alt="Vidyaloop Certificate - Building Emotional Balance"
                  className="w-full h-auto rounded-xl shadow-lg block"
                />

                {/* Course name overlay — replaces "Effective Communication" baked into image */}
                <div
                  className="absolute left-[22%] right-[22%] flex items-center justify-center pointer-events-none bg-white"
                  style={{ top: '57%', height: '7%' }}
                  aria-hidden="true"
                >
                  <span
                    className="font-bold whitespace-nowrap leading-none"
                    style={{
                      color: '#2479C9',
                      fontSize: 'clamp(12px, 2.3vw, 28px)',
                      letterSpacing: '-0.01em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    Building Emotional Balance
                  </span>
                </div>

                {/* Download Button Overlay - Desktop Only */}
                <div className="hidden md:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/3xxzhc67_Vidyaloop_General_Certificate_Final.png"
                    download="Vidyaloop_General_Certificate_Sample.png"
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
                  href="https://customer-assets.emergentagent.com/job_vidya-tutor-hub/artifacts/3xxzhc67_Vidyaloop_General_Certificate_Final.png"
                  download="Vidyaloop_General_Certificate_Sample.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-all shadow-md active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate</span>
                </a>
              </div>

              {/* Certificate Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Certificate Features</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Recognized completion certificate</li>
                      <li>• Personalized with your name</li>
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

export default Course;
