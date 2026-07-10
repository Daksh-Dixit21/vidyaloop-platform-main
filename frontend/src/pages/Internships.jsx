import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Briefcase, MapPin, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const Internships = () => {
  const internships = [
    {
      id: 1,
      icon: "💻",
      title: "Frontend Developer Intern",
      location: "Remote",
      duration: "4 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "Project-Based"],
      whatYouDo: "Build responsive web interfaces for real education platform",
      whatYouGain: "Live project experience, portfolio-ready work, React expertise",
      skills: ["React", "JavaScript", "Tailwind CSS"],
      type: "Virtual"
    },
    {
      id: 2,
      icon: "🤖",
      title: "AI/ML Research Intern",
      location: "Remote",
      duration: "6 weeks",
      level: "Intermediate",
      tags: ["Portfolio Booster", "Project-Based"],
      whatYouDo: "Train machine learning models for student performance analysis",
      whatYouGain: "Hands-on ML experience, published project, data science skills",
      skills: ["Python", "TensorFlow", "Data Analysis"],
      type: "Virtual"
    },
    {
      id: 3,
      icon: "📱",
      title: "Mobile App Developer Intern",
      location: "Remote",
      duration: "5 weeks",
      level: "Intermediate",
      tags: ["Project-Based", "Portfolio Booster"],
      whatYouDo: "Develop cross-platform mobile features for e-learning app",
      whatYouGain: "Mobile development skills, real app deployment, portfolio project",
      skills: ["React Native", "Firebase", "API Integration"],
      type: "Virtual"
    },
    {
      id: 4,
      icon: "📊",
      title: "Data Analytics Intern",
      location: "Remote",
      duration: "4 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "Portfolio Booster"],
      whatYouDo: "Analyze user engagement data and create interactive dashboards",
      whatYouGain: "Analytics expertise, dashboard portfolio, data storytelling skills",
      skills: ["Python", "Excel", "Data Visualization"],
      type: "Virtual"
    },
    {
      id: 5,
      icon: "🎨",
      title: "UI/UX Design Intern",
      location: "Remote",
      duration: "3 weeks",
      level: "Beginner",
      tags: ["Beginner Friendly", "Project-Based"],
      whatYouDo: "Design user interfaces and conduct usability testing for web apps",
      whatYouGain: "Design portfolio, user research skills, real-world UX experience",
      skills: ["Figma", "User Research", "Prototyping"],
      type: "Virtual"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg inline-flex flex-shrink-0">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Virtual Internships</h1>
              <p className="text-sm sm:text-base text-gray-600">Gain real-world experience by working on practical projects</p>
            </div>
          </div>
        </div>

        {/* Learning to Internship Connection */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 flex-shrink-0" />
            <h2 className="text-sm sm:text-lg font-bold text-gray-900">Complete courses → Build skills → Apply for internships</h2>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">
            Based on your learning progress, you are eligible for these roles
          </p>
        </div>

        {/* Why These Internships */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Why these internships?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Work on real-world projects</h3>
                <p className="text-xs text-gray-600">Build actual products used by real users</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💼</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Build a strong portfolio</h3>
                <p className="text-xs text-gray-600">Showcase your work to future employers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Apply what you learn</h3>
                <p className="text-xs text-gray-600">Put your course knowledge into practice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {internships.map((internship, index) => (
            <div
              key={internship.id}
              className="relative group bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-5 lg:p-6 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 overflow-hidden max-w-full"
            >
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Featured badge - positioned safely in top-right, won't overlap title */}
              {index < 2 && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-[10px] sm:text-xs font-bold shadow-md z-10">
                  ⭐ Featured
                </div>
              )}

              {/* Header - Proper spacing to avoid badge overlap */}
              <div className="relative flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 pr-16 sm:pr-20">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ring-2 ring-cyan-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {internship.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight group-hover:text-cyan-600 transition-colors mb-2 pr-2">
                    {internship.title}
                  </h3>
                  {/* Tags - wrap properly on small screens */}
                  <div className="flex flex-wrap gap-1.5">
                    {internship.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded text-[10px] sm:text-xs font-medium border border-cyan-200 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold whitespace-nowrap ${
                      internship.level === 'Beginner' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      {internship.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* What You'll Do - Proper spacing */}
              <div className="relative mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">What you'll do:</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {internship.whatYouDo}
                </p>
              </div>

              {/* What You'll Gain - Highlighted on Hover - Proper spacing */}
              <div className="relative mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100 group-hover:bg-gradient-to-r group-hover:from-cyan-50 group-hover:to-blue-50 group-hover:-mx-2 group-hover:px-2 group-hover:py-3 group-hover:rounded-xl transition-all duration-300">
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <span>What you'll gain:</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
                </p>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {internship.whatYouGain}
                </p>
              </div>

              {/* Details - Location & Duration */}
              <div className="relative bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 border border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-100 rounded-lg flex-shrink-0">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Location</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{internship.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 rounded-lg flex-shrink-0">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Duration</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{internship.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills - Proper wrapping and spacing */}
              <div className="relative mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-cyan-600 to-blue-600 rounded-full"></div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Required Skills</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="relative px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 rounded-lg text-xs font-bold border border-cyan-200 hover:from-cyan-100 hover:to-blue-100 hover:shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button - Full width on mobile, proper padding */}
              <div className="relative">
                <button className="w-full flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all group/btn relative overflow-hidden text-sm sm:text-base" style={{background: '#4EC0F4'}}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  <span className="relative">Apply Now</span>
                  <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{background: '#4EC0F4'}}></div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
            Ready to take the next step? Apply to internships that match your skills and start building your portfolio.
          </p>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base">
            Get Notified for New Opportunities
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Internships;
