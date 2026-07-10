import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Sparkles, TrendingUp, Target, Award, ArrowRight, CheckCircle2, Circle, TrendingUpIcon } from 'lucide-react';

const Career = () => {
  const profileData = {
    name: "Aarav",
    class: "Class 10",
    strengths: ["Logical Thinking", "Problem Solving", "Creativity"],
    weaknesses: ["Algebra", "Communication"]
  };

  const recommendations = [
    {
      id: 1,
      title: "Start Python Programming",
      reason: "Matches your logical thinking strength (92%)",
      priority: "High Priority"
    },
    {
      id: 2,
      title: "Strengthen Algebra Fundamentals",
      reason: "Address your weak area (45%) to unlock advanced topics",
      priority: "Recommended"
    }
  ];

  const learningPath = [
    { id: 1, title: "Foundation Mathematics", completed: true, progress: 100 },
    { id: 2, title: "Introduction to Python", completed: true, progress: 100 },
    { id: 3, title: "Data Structures Basics", completed: false, progress: 60, current: true },
    { id: 4, title: "Advanced Algorithms", completed: false, progress: 0 },
    { id: 5, title: "Real-World Projects", completed: false, progress: 0 }
  ];

  const skillsData = [
    { name: "Programming", currentLevel: "Intermediate" },
    { name: "Mathematics", currentLevel: "Beginner" },
    { name: "Problem Solving", currentLevel: "Advanced" },
    { name: "Communication", currentLevel: "Beginner" }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg inline-flex flex-shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Personalized Adaptive Learning</h1>
              <p className="text-sm sm:text-base text-gray-600">Your AI-powered learning journey</p>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200 p-4 sm:p-6 mb-5 sm:mb-6 shadow-md overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          
          {/* AI Analyzed badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-indigo-200 shadow-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700">AI Analyzed</span>
            </div>
          </div>

          <div className="relative flex items-start justify-between">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{profileData.name}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{profileData.class}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Your Strengths</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.strengths.map((strength) => (
                      <span key={strength} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold border border-green-200 shadow-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.weaknesses.map((weakness) => (
                      <span key={weakness} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-semibold border border-orange-200 shadow-sm">
                        {weakness}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Adaptive Suggestions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-5 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900">AI Adaptive Suggestions</h3>
            </div>
            <span className="self-start sm:self-auto flex-shrink-0 px-2.5 sm:px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] sm:text-xs font-bold border border-indigo-200">
              Personalized for you
            </span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-5 border-2 border-indigo-200 hover:shadow-md transition-all">
                {/* Next best step indicator */}
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 px-2.5 sm:px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-[10px] sm:text-xs font-bold shadow-md">
                    ⭐ Next Best Step
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 mt-2">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{rec.title}</h4>
                  <span className={`self-start flex-shrink-0 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm ${
                    rec.priority === "High Priority" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1 h-1 mt-2 rounded-full bg-indigo-600 flex-shrink-0"></span>
                  {rec.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Path */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-5 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Your Recommended Path</h3>
            </div>
            <span className="self-start sm:self-auto flex-shrink-0 px-2.5 sm:px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] sm:text-xs font-bold border border-green-200">
              2 of 5 completed
            </span>
          </div>

          <div className="space-y-4">
            {learningPath.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Connector line */}
                {index < learningPath.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-200"></div>
                )}

                {/* Recommended badge for current item */}
                {item.current && (
                  <div className="absolute -top-2 right-4 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-bold shadow-md z-10">
                    📚 Recommended for you
                  </div>
                )}

                <div className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                  item.current 
                    ? "border-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md" 
                    : item.completed 
                      ? "border-green-200 bg-green-50/50" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                    item.completed 
                      ? "bg-green-600 ring-2 ring-green-200" 
                      : item.current 
                        ? "bg-indigo-600 ring-2 ring-indigo-200 animate-pulse-slow" 
                        : "bg-gray-200"
                  }`}>
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : item.current ? (
                      <Circle className="w-6 h-6 text-white fill-current" />
                    ) : (
                      <span className="text-sm font-bold text-gray-600">{item.id}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      item.current ? "text-indigo-700" : "text-gray-900"
                    }`}>
                      {item.title}
                    </h4>
                    {item.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 font-medium">Progress</span>
                          <span className="font-bold text-gray-900">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.completed ? "bg-green-600" : "bg-gradient-to-r from-indigo-600 to-purple-600"
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {item.current && (
                    <span className="flex-shrink-0 px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-sm">
                      Active
                    </span>
                  )}
                  {item.completed && (
                    <span className="flex-shrink-0 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold shadow-sm">
                      ✓ Done
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Progress Tracker */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-5 sm:mb-6 shadow-sm">
          {/* Title */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Skill Progress Tracker</h3>
          </div>

          {/* Skills */}
          <div className="space-y-5">
            {skillsData.map((skill) => {
              const levels = ["Beginner", "Intermediate", "Advanced"];
              const currentIndex = levels.indexOf(skill.currentLevel);
              
              return (
                <div key={skill.name}>
                  {/* Skill name */}
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">{skill.name}</h4>
                  
                  {/* Progress bar */}
                  <div className="mb-1.5">
                    <div className="grid grid-cols-3 gap-1.5">
                      {levels.map((level, levelIndex) => {
                        const isActive = levelIndex <= currentIndex;
                        const isCurrent = levelIndex === currentIndex;
                        
                        // Determine gradient colors
                        let gradientClass = "";
                        if (isActive) {
                          if (skill.currentLevel === "Beginner") {
                            gradientClass = "bg-gradient-to-r from-purple-600 to-purple-600";
                          } else if (skill.currentLevel === "Intermediate") {
                            if (levelIndex === 0) {
                              gradientClass = "bg-gradient-to-r from-emerald-500 to-emerald-500";
                            } else {
                              gradientClass = "bg-gradient-to-r from-purple-600 to-purple-600";
                            }
                          } else if (skill.currentLevel === "Advanced") {
                            if (levelIndex === 0 || levelIndex === 1) {
                              gradientClass = "bg-gradient-to-r from-emerald-500 to-emerald-500";
                            } else {
                              gradientClass = "bg-gradient-to-r from-purple-600 to-purple-600";
                            }
                          }
                        }
                        
                        return (
                          <div
                            key={levelIndex}
                            className={`h-4 rounded-lg ${
                              isActive ? gradientClass : "bg-gray-200"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {levels.map((level, levelIndex) => {
                      const isCurrent = levelIndex === currentIndex;
                      
                      return (
                        <div key={levelIndex} className="flex flex-col items-center">
                          {isCurrent && (
                            <div className="text-indigo-600 text-xs mb-0.5">▲</div>
                          )}
                          <span
                            className={`text-xs ${
                              isCurrent
                                ? "font-bold text-indigo-600"
                                : "font-medium text-gray-500"
                            }`}
                          >
                            {level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto" style={{background: '#4EC0F4'}}>
            <span>Start Your Next Best Step</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Career;
