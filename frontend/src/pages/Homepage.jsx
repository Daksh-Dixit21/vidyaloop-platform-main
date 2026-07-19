import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Briefcase,
  MessageCircle,
  Brain,
  TrendingUp,
  Lightbulb,
  Rocket,
  Target,
  CheckCircle2,
  Compass,
  Eye,
  X,
  Sun,
  Heart,
  ShieldCheck,
  Smartphone,
  Gamepad2
} from 'lucide-react';

const BRAND_BLUE = '#4EC0F4';

const Homepage = () => {
  const [showBetaBanner, setShowBetaBanner] = useState(true);

  const ecosystemFeatures = [
    {
      icon: Brain,
      title: "Learning Blueprint & Assessment",
      description: "Understand your strengths, fix your gaps, and discover what you're truly good at.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: BookOpen,
      title: "Short Courses & STEM Learning",
      description: "Build real skills in coding, AI, communication, and more — step by step.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: MessageCircle,
      title: "AI Study Buddy",
      description: "Get instant help in any subject, anytime — no more getting stuck.",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: Sparkles,
      title: "PAL (AI Mentor)",
      description: "Stay on track with your personal AI mentor guiding your learning journey.",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Career Discovery & MetaTagging",
      description: "Find the right career paths based on your interests and strengths.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Briefcase,
      title: "Virtual Internships",
      description: "Work on real-world projects and gain experience before college.",
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Beta Banner */}
      {showBetaBanner && (
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2 sm:py-3 flex items-center gap-2">
            <div className="flex-1 flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4 flex-shrink-0 hidden sm:block" style={{color: '#4EC0F4'}} />
              <p className="text-[11px] sm:text-sm text-gray-800 text-center leading-snug">
                <span className="font-semibold animate-pulse-glow" style={{color: '#4EC0F4'}}>Vidyaloop Beta is live</span>
                <span className="text-gray-700"> — shaped by real feedback from students, teachers, and schools. </span>
                <span className="font-semibold animate-pulse-glow" style={{color: '#4EC0F4'}}>We're now onboarding schools for our pilot phase.</span>
              </p>
            </div>
            <button
              onClick={() => setShowBetaBanner(false)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close banner"
              data-testid="close-beta-banner-button"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-40 transition-all ${showBetaBanner ? 'top-[64px] sm:top-[52px]' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 sm:py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-10 sm:h-12 lg:h-14" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/student/login" className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-600 hover:text-[#4EC0F4] hover:bg-blue-50 rounded-lg transition-all">
                Login
              </Link>
              <Link 
                to="/dashboard"
                className="px-3 sm:px-5 py-1.5 sm:py-2 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-xs sm:text-sm flex items-center gap-1.5"
                style={{background: '#4EC0F4'}}
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Featured: Summer Growth Camp — clickable premium section (TOP) */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/summer-growth-camp"
            className="group relative block rounded-[2rem] overflow-hidden border border-blue-100 bg-gradient-to-br from-white via-sky-50/50 to-white shadow-[0_8px_40px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_80px_rgba(78,192,244,0.22)] hover:-translate-y-1 transition-all duration-500 premium-fade-up"
            data-testid="homepage-summer-growth-camp-banner"
          >
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none" />

            {/* Glow blobs */}
            <div
              className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-50 pointer-events-none glow-float"
              style={{ background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-32 -left-24 w-[340px] h-[340px] rounded-full blur-3xl opacity-40 pointer-events-none glow-float"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', animationDelay: '2s' }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 p-7 sm:p-12 lg:p-14">
              {/* Left content (3 cols) */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur border border-blue-100 shadow-sm mb-5 sm:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#4EC0F4' }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4EC0F4' }}></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#0ea5e9' }}>
                    New This Summer
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.25] mb-3 sm:mb-4 text-gray-900">
                  <span className="block">Introducing</span>
                  <span
                    className="block pb-1"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #4EC0F4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Summer Growth Camp
                  </span>
                </h2>

                <p className="text-[15px] sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-7 sm:mb-8">
                  A modern student growth experience designed to help students build confidence, emotional strength, self-awareness, communication skills, and future readiness during summer vacations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8 sm:mb-9 max-w-2xl mx-auto lg:mx-0">
                  {[
                    { icon: Sparkles, label: 'AI-Powered Growth Assessments' },
                    { icon: Eye, label: 'Personalized Student Reports' },
                    { icon: Heart, label: 'Confidence & Emotional Growth' },
                    { icon: Rocket, label: 'Future Readiness Insights' },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2.5 bg-white/80 backdrop-blur rounded-xl border border-blue-100 px-3 py-2.5 shadow-sm"
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(78,192,244,0.12)' }}
                      >
                        <f.icon className="w-3.5 h-3.5" style={{ color: '#4EC0F4' }} />
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-gray-800 leading-tight">{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="inline-flex">
                  <span
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300"
                    style={{ background: '#4EC0F4' }}
                  >
                    <Sun className="w-5 h-5" />
                    <span>Explore Summer Growth Camp</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Right visual (2 cols) — mini report mockup */}
              <div className="lg:col-span-2 flex items-center">
                <div className="relative w-full">
                  <div className="hidden sm:flex absolute -top-3 -left-2 z-10 items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
                    <span className="text-[11px] font-semibold text-gray-700">Trusted by schools</span>
                  </div>
                  <div className="hidden sm:flex absolute -bottom-3 -right-2 z-10 items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#4EC0F4' }} />
                    <span className="text-[11px] font-semibold text-gray-700">AI Insights</span>
                  </div>

                  <div className="gradient-border-card shadow-[0_20px_60px_rgba(78,192,244,0.18)] p-5 sm:p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4EC0F4' }}>
                          Growth Report
                        </p>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">Aarav · Class 10</h4>
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                      >
                        <Sun className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Confidence', value: 88, color: '#4EC0F4' },
                        { label: 'Emotional Balance', value: 76, color: '#10b981' },
                        { label: 'Communication', value: 82, color: '#6366f1' },
                        { label: 'Future Readiness', value: 91, color: '#8b5cf6' },
                      ].map((b) => (
                        <div key={b.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-semibold text-gray-700">{b.label}</span>
                            <span className="text-[11px] font-bold text-gray-900 tabular-nums">{b.value}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700 group-hover:w-full" style={{ width: `${b.value}%`, background: b.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#4EC0F4' }} />
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">Top strength:</span> Future Readiness
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Subtle premium highlight — Creator Challenges */}
      <section className="px-4 sm:px-8 pb-8 sm:pb-10">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/summer-growth-camp"
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 rounded-2xl overflow-hidden border border-blue-100 bg-gradient-to-r from-sky-50/70 via-white to-violet-50/40 px-5 sm:px-7 py-4 sm:py-5 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(78,192,244,0.15)] transition-all duration-300"
            data-testid="homepage-creator-challenges-highlight"
          >
            <div className="absolute -top-12 -right-8 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                 style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />

            <div className="relative flex items-center gap-4 min-w-0">
              {/* Mini visual: App + Game */}
              <div className="hidden sm:flex flex-shrink-0 -space-x-2">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-white shadow-sm flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                >
                  <Smartphone className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div
                  className="w-10 h-10 rounded-xl border-2 border-white shadow-sm flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                >
                  <Gamepad2 className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                        style={{ color: '#0369a1', background: 'rgba(78,192,244,0.12)' }}>
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>New · Creator Challenges</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border bg-white launch-glow"
                        style={{ color: BRAND_BLUE, borderColor: 'rgba(78,192,244,0.5)' }}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: BRAND_BLUE }}></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: BRAND_BLUE }}></span>
                    </span>
                    <span>Launching June 8</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  Build Your Own App or Game This Summer
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mt-0.5">
                  Creator Challenges launch June 8 inside Summer Growth Camp.
                  <span className="text-gray-400"> · No experience needed.</span>
                </p>
              </div>
            </div>

            <span
              className="relative flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-blue-200 text-blue-700 rounded-xl font-semibold text-xs sm:text-sm group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:scale-[1.03] transition-all shadow-sm"
            >
              <span>Explore Summer Growth Camp</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="pt-4 sm:pt-8">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-blue-100">
                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
                <span>AI-Powered Learning</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium text-gray-700 mb-4 sm:mb-6 leading-tight">
                <span className="block sm:inline">Discover Your</span>
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline font-bold text-4xl sm:text-4xl lg:text-6xl tracking-tight" style={{color: '#4EC0F4'}}>Learning DNA</span>
              </h1>
              <div className="mb-4 sm:mb-5 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Start with what school often misses — building confidence, communication, self-awareness, and more through short courses in personality development. Then discover the right career path through psychometric assessments and guided exploration.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  With AI tutors supporting every step, go on to build real-world skills, experience careers through virtual internships, and work on hands-on STEM projects - all brought together in one personalized journey designed for every student.
                </p>
              </div>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8">
                <span className="block sm:inline">Stop guessing your future.</span>
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline">Start building it.</span>
              </p>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Primary CTA — Students */}
                <Link 
                  to="/dashboard"
                  className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  style={{background: '#4EC0F4'}}
                  data-testid="hero-explore-dashboard-btn"
                >
                  <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Explore Dashboard</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>

                {/* Secondary CTA — Schools (same prominence as primary) */}
                <Link 
                  to="/for-schools"
                  className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  style={{background: '#4EC0F4'}}
                  data-testid="hero-book-school-demo-btn"
                >
                  <Briefcase className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>Book a School Demo</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </Link>
              </div>
            </div>
            
            {/* Learning DNA Preview Card */}
            <div className="relative pt-4 sm:pt-8 w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl blur-3xl opacity-40"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 hover:shadow-3xl transition-shadow duration-300 w-full">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 sm:mb-5">Your Learning DNA</div>
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-semibold text-gray-800">Logical Thinking</span>
                      <span className="text-lg font-bold text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out shadow-sm" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-semibold text-gray-800">Creativity</span>
                      <span className="text-lg font-bold text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out delay-150 shadow-sm" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-semibold text-gray-800">Problem Solving</span>
                      <span className="text-lg font-bold text-gray-900">88%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000 ease-out delay-300 shadow-sm" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recommended for you</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">Python</span>
                    <span className="px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100 hover:bg-green-100 transition-colors cursor-pointer">Data Science</span>
                    <span className="px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer">Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning DNA - Main Highlight Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-semibold mb-4 border border-blue-100">
              <span>Built Just For You</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-5">Your Learning Blueprint</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              AI analyzes your strengths and learning style to create a personalized path for your future.
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-2 border-indigo-100 relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 border border-gray-100 w-full">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">Aarav</div>
                    <div className="text-xs sm:text-sm text-gray-500">Class 10 • DAV Public School</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                    <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Top Strength</div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Logical Thinking</div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">92%</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-orange-200 hover:shadow-lg transition-all duration-300">
                    <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">Growth Area</div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Communication</div>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600">52%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Recommended Path</div>
                  {["Python Programming", "Data Structures", "AI/ML Basics"].map((course) => (
                    <div key={course} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200">
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{course}</span>
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Personalized learning, powered by AI</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Discover your unique cognitive strengths",
                    "Understand your personality traits",
                    "Get AI-powered recommendations",
                    "Unlock careers that match your DNA"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 sm:w-7 h-6 sm:h-7 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                        <CheckCircle2 className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                      <span className="text-base sm:text-lg text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey - Visual Path */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 sm:mb-4 px-4 leading-[1.25] pb-2">
              Your Learning Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              A step-by-step path from self-discovery to building your future
            </p>
          </div>

          {/* Desktop: Horizontal Journey */}
          <div className="hidden lg:block relative">
            {/* Premium Straight Path - aligned through icon centers, BEHIND icons */}
            <div className="absolute left-0 right-0 pointer-events-none flex items-center" style={{top: '40px', transform: 'translateY(-50%)', height: '48px', zIndex: 0}}>
              {/* Soft glow underlay */}
              <div
                className="absolute left-0 right-0 h-3 blur-md opacity-40"
                style={{background: 'linear-gradient(90deg, #4EC0F4 0%, #6366f1 50%, #8b5cf6 100%)'}}
              ></div>
              {/* Main crisp line */}
              <div
                className="absolute left-0 right-0 rounded-full"
                style={{height: '4px', background: 'linear-gradient(90deg, #4EC0F4 0%, #6366f1 50%, #8b5cf6 100%)'}}
              ></div>
              {/* Animated traveling dot */}
              <div
                className="absolute animate-journey-dot"
                style={{
                  top: '50%',
                  width: '14px',
                  height: '14px',
                  marginTop: '-7px',
                  borderRadius: '9999px',
                  background: 'radial-gradient(circle at 30% 30%, #ffffff, #4EC0F4 55%, #6366f1 100%)',
                  boxShadow: '0 0 14px rgba(78, 192, 244, 0.8), 0 0 28px rgba(99, 102, 241, 0.5)',
                }}
              ></div>
            </div>

            {/* Checkpoints Layer - Icons and Titles (above the line) */}
            <div className="relative grid grid-cols-6 items-start px-0 mb-16" style={{zIndex: 1}}>
              {[
                {
                  icon: BookOpen,
                  title: "Start with Short Courses",
                  subtitle: "Foundation Building",
                  description: "Begin with personality development courses to build confidence, communication, and self-awareness.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-300",
                  textColor: "text-blue-700",
                  glowColor: "shadow-blue-500/50",
                  active: true
                },
                {
                  icon: Brain,
                  title: "Discover Yourself",
                  subtitle: "Psychometric Assessments",
                  description: "Take psychometric assessments to understand your strengths, interests, and personality.",
                  color: "from-indigo-500 to-purple-500",
                  bgColor: "bg-indigo-50",
                  borderColor: "border-indigo-300",
                  textColor: "text-indigo-700",
                  glowColor: "shadow-indigo-500/50"
                },
                {
                  icon: Lightbulb,
                  title: "Learn Skills",
                  subtitle: "Curated Learning Paths",
                  description: "Access curated courses like coding, programming, design thinking, arts, and more.",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-50",
                  borderColor: "border-purple-300",
                  textColor: "text-purple-700",
                  glowColor: "shadow-purple-500/50"
                },
                {
                  icon: Sparkles,
                  title: "Get AI Guidance",
                  subtitle: "Personalized Support",
                  description: "Learn with AI mentors and teacher assistants for personalized support 24/7.",
                  color: "from-pink-500 to-rose-500",
                  bgColor: "bg-pink-50",
                  borderColor: "border-pink-300",
                  textColor: "text-pink-700",
                  glowColor: "shadow-pink-500/50"
                },
                {
                  icon: Briefcase,
                  title: "Try Real-World Projects",
                  subtitle: "Practical Experience",
                  description: "Work on projects and internships to gain practical experience and build your portfolio.",
                  color: "from-orange-500 to-amber-500",
                  bgColor: "bg-orange-50",
                  borderColor: "border-orange-300",
                  textColor: "text-orange-700",
                  glowColor: "shadow-orange-500/50"
                },
                {
                  icon: Rocket,
                  title: "Build Your Future",
                  subtitle: "Ready for Success",
                  description: "Grow with clarity, confidence, and real-world readiness to achieve your goals.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-300",
                  textColor: "text-green-700",
                  glowColor: "shadow-green-500/50"
                }
              ].map((checkpoint, index) => (
                <div key={checkpoint.title} className="relative flex flex-col items-center group px-2">
                  {/* Checkpoint Icon */}
                  <div className="relative mb-6">
                    {/* Pulse ring for active/first checkpoint */}
                    {checkpoint.active && (
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                    )}
                    
                    {/* Main circle */}
                    <div 
                      className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${checkpoint.color} flex items-center justify-center 
                        shadow-xl ${checkpoint.active ? 'ring-4 ring-blue-300 ring-offset-4 scale-110' : 'hover:scale-110'} 
                        transition-all duration-300 cursor-pointer z-10`}
                    >
                      <checkpoint.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title - Above path */}
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {checkpoint.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {checkpoint.subtitle}
                    </p>
                  </div>

                  {/* Hover Card */}
                  <div className={`absolute top-full mt-6 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 z-30 pointer-events-none`}>
                    <div className={`${checkpoint.bgColor} rounded-2xl p-5 border-2 ${checkpoint.borderColor} shadow-2xl ${checkpoint.glowColor}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${checkpoint.color} flex items-center justify-center shadow-md`}>
                          <checkpoint.icon className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{checkpoint.title}</h4>
                          <p className="text-xs text-gray-600">{checkpoint.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {checkpoint.description}
                      </p>
                    </div>
                    {/* Arrow pointer */}
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${checkpoint.bgColor} 
                      border-t-2 border-l-2 ${checkpoint.borderColor} rotate-45`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Journey */}
          <div className="lg:hidden relative px-4">
            {/* Premium Vertical Path with Glow */}
            <div className="absolute left-14 top-0 bottom-0 w-1 pointer-events-none">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 blur-sm opacity-40"></div>
              {/* Main gradient line */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-90 rounded-full"></div>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: BookOpen,
                  title: "Start with Short Courses",
                  subtitle: "Foundation Building",
                  description: "Begin with personality development courses to build confidence, communication, and self-awareness.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-300",
                  active: true
                },
                {
                  icon: Brain,
                  title: "Discover Yourself",
                  subtitle: "Psychometric Assessments",
                  description: "Take psychometric assessments to understand your strengths, interests, and personality.",
                  color: "from-indigo-500 to-purple-500",
                  bgColor: "bg-indigo-50",
                  borderColor: "border-indigo-300"
                },
                {
                  icon: Lightbulb,
                  title: "Learn Skills",
                  subtitle: "Curated Learning Paths",
                  description: "Access curated courses like coding, programming, design thinking, arts, and more.",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-50",
                  borderColor: "border-purple-300"
                },
                {
                  icon: Sparkles,
                  title: "Get AI Guidance",
                  subtitle: "Personalized Support",
                  description: "Learn with AI mentors and teacher assistants for personalized support.",
                  color: "from-pink-500 to-rose-500",
                  bgColor: "bg-pink-50",
                  borderColor: "border-pink-300"
                },
                {
                  icon: Briefcase,
                  title: "Try Real-World Projects",
                  subtitle: "Practical Experience",
                  description: "Work on projects and internships to gain practical experience.",
                  color: "from-orange-500 to-amber-500",
                  bgColor: "bg-orange-50",
                  borderColor: "border-orange-300"
                },
                {
                  icon: Rocket,
                  title: "Build Your Future",
                  subtitle: "Ready for Success",
                  description: "Grow with clarity, confidence, and real-world readiness.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-50",
                  borderColor: "border-green-300"
                }
              ].map((checkpoint, index) => (
                <div key={checkpoint.title} className="relative flex gap-4">
                  {/* Node */}
                  <div className="relative flex-shrink-0">
                    {checkpoint.active && (
                      <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                    )}
                    <div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${checkpoint.color} flex items-center justify-center 
                        shadow-lg ${checkpoint.active ? 'ring-4 ring-blue-300' : ''} z-10 relative`}
                    >
                      <checkpoint.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ${checkpoint.bgColor} rounded-2xl p-5 border-2 ${checkpoint.borderColor} shadow-lg`}>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {checkpoint.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium mb-3">
                      {checkpoint.subtitle}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {checkpoint.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <Link 
              to="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{background: '#4EC0F4'}}
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Ecosystem Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-4">Powerful Tools for Every Step</h2>
            <p className="text-base sm:text-xl text-gray-600 px-4">Comprehensive features designed to help you discover, build, and achieve your goals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {ecosystemFeatures.map((feature) => (
              <div 
                key={feature.title} 
                className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group overflow-hidden w-full"
              >
                {/* Gradient header strip with glow */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${feature.gradient} opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Premium icon with glassmorphism */}
                <div className="relative mb-5 sm:mb-6">
                  {/* Gradient blob background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-3xl blur-2xl scale-150 group-hover:scale-[1.7] transition-transform duration-500`}></div>
                  
                  {/* Glass container */}
                  <div className={`relative w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-xl sm:rounded-2xl"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl rounded-xl sm:rounded-2xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                    
                    {/* Icon */}
                    <feature.icon className="w-8 sm:w-10 h-8 sm:h-10 text-white relative z-10 drop-shadow-lg" />
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature.description}</p>
                
                {/* Subtle corner accent */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-full group-hover:opacity-10 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">Start Building Your Future Today</h2>
          <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 px-4">
            Join thousands of students discovering their potential.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 px-4">
            <Link 
              to="/dashboard"
              className="px-8 sm:px-12 py-4 sm:py-5 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-xl group"
              style={{background: '#4EC0F4'}}
            >
              <Eye className="w-5 sm:w-6 h-5 sm:h-6" />
              <span>Explore Dashboard</span>
              <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          {/* Centered Logo */}
          <div className="flex justify-center mb-4 sm:mb-5">
            <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-20 sm:h-24 lg:h-32" />
          </div>
          
          {/* Brand Statement */}
          <div className="max-w-3xl mx-auto mb-5 sm:mb-6 space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Every student is unique. <span className="font-semibold" style={{color: '#33aaff'}}>VidyaLoop</span> helps you discover who you are and who you can become.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Learn smarter, grow faster, and build your future with confidence.
            </p>
          </div>
          
          {/* Copyright */}
          <div className="pt-3 sm:pt-4 border-t border-gray-100 text-center text-cyan-500 text-xs sm:text-sm font-medium">
            © 2025 VidyaLoop. All rights reserved. Designed with ❤️ in India, for India.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
