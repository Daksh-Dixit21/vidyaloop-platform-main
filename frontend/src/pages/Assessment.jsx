import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

const assessmentQuestions = [
  {
    id: 1,
    question: "Which activity do you enjoy the most?",
    options: [
      { id: 1, emoji: "🎯", text: "Building things" },
      { id: 2, emoji: "🧩", text: "Solving puzzles" },
      { id: 3, emoji: "🎨", text: "Drawing or designing" },
      { id: 4, emoji: "✍️", text: "Writing stories" }
    ]
  },
  {
    id: 2,
    question: "What do you want to get better at?",
    options: [
      { id: 1, emoji: "📊", text: "Solving math problems" },
      { id: 2, emoji: "💻", text: "Learning coding & tech" },
      { id: 3, emoji: "🎤", text: "Communication & speaking" },
      { id: 4, emoji: "🎨", text: "Creativity & design" }
    ]
  }
];

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  const question = assessmentQuestions[currentQuestion];
  const totalQuestions = assessmentQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setAnswers({ ...answers, [currentQuestion]: optionId });
    
    // Auto-advance to next question after a brief delay (smooth UX)
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(answers[currentQuestion + 1] || null);
      }
    }, 600); // 600ms delay for visual feedback
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [currentQuestion]: selectedOption });
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(answers[currentQuestion + 1] || null);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 page-fade-in">
        {/* Tab Switch - 4 tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold toggle-smooth text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'assessment'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'assessment' ? {background: '#4EC0F4'} : {}}
            >
              Assessment
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold toggle-smooth text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'report'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'report' ? {background: '#4EC0F4'} : {}}
            >
              Sample Report
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold toggle-smooth text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'library'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'library' ? {background: '#4EC0F4'} : {}}
            >
              Career Library
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold toggle-smooth text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'directory'
                  ? 'text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'directory' ? {background: '#4EC0F4'} : {}}
            >
              College Directory
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'assessment' ? (
          <>
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Psychometric Assessment</h1>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              </div>
              <p className="text-gray-600 text-base sm:text-lg">This helps us personalize your learning journey ✨</p>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-gray-700">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span className="text-xs sm:text-sm font-bold text-cyan-600">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="relative w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-500 relative overflow-hidden shadow-md"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                  <div className="absolute inset-0 bg-white/10"></div>
                </div>
              </div>
            </div>

            {/* Question Card with Gradient Background */}
            <div className="relative bg-gradient-to-br from-cyan-50 via-blue-50/30 to-indigo-50/20 rounded-2xl border-2 border-cyan-100 p-4 sm:p-6 lg:p-8 mb-6 shadow-md overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="mb-6 sm:mb-8">
                  <div className="inline-block px-3 sm:px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 shadow-sm">
                    Question {currentQuestion + 1}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed break-words">
                    {question.question}
                  </h2>
                </div>

                {/* Enhanced Answer Options - Mobile-first Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {question.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`relative group p-4 sm:p-5 lg:p-6 rounded-xl border-2 transition-all duration-300 text-left min-h-[80px] sm:min-h-[90px] flex items-center ${
                        selectedOption === option.id
                          ? 'border-cyan-600 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg scale-[1.02] active:scale-100'
                          : 'border-gray-200 bg-white hover:border-cyan-400 hover:bg-cyan-50/30 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]'
                      }`}
                    >
                      {/* Selected indicator with animation */}
                      {selectedOption === option.id && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 animate-in fade-in zoom-in duration-300">
                          <div className="relative">
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-cyan-600 drop-shadow-sm" fill="currentColor" />
                            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-30 animate-pulse"></div>
                          </div>
                        </div>
                      )}

                      {/* Color accent bar for selected state */}
                      {selectedOption === option.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-gradient-to-b from-cyan-600 to-cyan-700 rounded-l-xl"></div>
                      )}

                      {/* Option content - Improved layout */}
                      <div className="flex items-center gap-3 sm:gap-4 w-full pr-6 sm:pr-8">
                        <div className={`text-3xl sm:text-4xl transition-all duration-300 flex-shrink-0 ${
                          selectedOption === option.id 
                            ? 'scale-110 drop-shadow-lg' 
                            : 'group-hover:scale-105'
                        }`}>
                          {option.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm sm:text-base lg:text-lg font-semibold transition-colors duration-200 leading-tight break-words ${
                            selectedOption === option.id ? 'text-cyan-700' : 'text-gray-900 group-hover:text-cyan-600'
                          }`}>
                            {option.text}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-cyan-400 shadow-sm hover:shadow-md'
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  disabled={currentQuestion === totalQuestions - 1}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    currentQuestion === totalQuestions - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-cyan-400 shadow-sm hover:shadow-md'
                  }`}
                >
                  Skip
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selectedOption || currentQuestion === totalQuestions - 1}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base ${
                    selectedOption && currentQuestion < totalQuestions - 1
                      ? 'text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  style={selectedOption && currentQuestion < totalQuestions - 1 ? {background: '#4EC0F4'} : {}}
                >
                  <span>Next</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : activeTab === 'report' ? (
          /* Sample Report Tab Content */
          <div className="text-center py-12 sm:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Sample Report</h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Your detailed assessment report will be displayed here after completing the assessment.
              </p>
            </div>
          </div>
        ) : activeTab === 'library' ? (
          /* Career Library Tab Content */
          <div className="text-center py-12 sm:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Career Library</h2>
              <p className="text-gray-600 text-base sm:text-lg mb-6">
                Explore different careers, understand job roles, skills required, and future opportunities.
              </p>
              <p className="text-sm text-gray-500">
                Coming soon: Comprehensive career guides, videos, and expert insights
              </p>
            </div>
          </div>
        ) : (
          /* College Directory Tab Content */
          <div className="text-center py-12 sm:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">College Directory</h2>
              <p className="text-gray-600 text-base sm:text-lg mb-6">
                Discover colleges, universities, and courses that match your interests and career goals.
              </p>
              <p className="text-sm text-gray-500">
                Coming soon: College rankings, admission guides, and course recommendations
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assessment;
