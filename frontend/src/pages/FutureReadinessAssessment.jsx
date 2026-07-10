import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import {
  Compass,
  MessageSquare,
  Brain,
  Cpu,
  Leaf,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Eye,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  Map,
  Sparkles,
} from 'lucide-react';

const dimensions = [
  {
    icon: Compass,
    title: 'Career Clarity',
    description: 'Understanding your interests, strengths, and future direction.',
    borderTop: 'border-t-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    cardBg: 'bg-blue-50/40',
  },
  {
    icon: MessageSquare,
    title: 'Communication & Expression',
    description: 'How effectively you express ideas and collaborate with others.',
    borderTop: 'border-t-indigo-400',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    cardBg: 'bg-indigo-50/40',
  },
  {
    icon: Brain,
    title: 'Problem-Solving & Critical Thinking',
    description: 'Your ability to analyze situations and make smart decisions.',
    borderTop: 'border-t-purple-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    cardBg: 'bg-purple-50/40',
  },
  {
    icon: Cpu,
    title: 'Digital & AI Readiness',
    description: 'Your comfort with technology, AI tools, and future digital skills.',
    borderTop: 'border-t-pink-400',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    cardBg: 'bg-pink-50/40',
  },
  {
    icon: Leaf,
    title: 'Adaptability & Growth Mindset',
    description: 'How well you learn, adapt, and grow through challenges.',
    borderTop: 'border-t-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    cardBg: 'bg-emerald-50/40',
  },
];

const insights = [
  {
    icon: Lightbulb,
    title: 'Personalized future-readiness insights',
    description: 'Clear reflections on how prepared you are for what is next.',
    borderTop: 'border-t-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    cardBg: 'bg-blue-50/40',
  },
  {
    icon: TrendingUp,
    title: 'Strengths and improvement areas',
    description: 'See what you are great at and where to grow.',
    borderTop: 'border-t-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    cardBg: 'bg-emerald-50/40',
  },
  {
    icon: CheckCircle2,
    title: 'Career and skill development direction',
    description: 'Actionable next steps for a future-ready journey.',
    borderTop: 'border-t-indigo-400',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    cardBg: 'bg-indigo-50/40',
  },
  {
    icon: Map,
    title: 'Recommended learning pathways',
    description: 'A guided path matched to your readiness profile.',
    borderTop: 'border-t-purple-400',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    cardBg: 'bg-purple-50/40',
  },
];

const quickInfo = [
  { icon: Clock, label: 'Takes 5–7 minutes' },
  { icon: HelpCircle, label: 'No right or wrong answers' },
  { icon: Zap, label: 'Instant results' },
];

const FeatureCard = ({ icon: Icon, title, description, borderTop, iconBg, iconColor, cardBg = 'bg-white' }) => (
  <div
    className={`${cardBg} rounded-xl border border-premium border-t-4 ${borderTop} p-5 card-interactive h-full shadow-premium text-center`}
  >
    <div className="flex justify-center mb-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base leading-snug">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const FutureReadinessAssessment = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto page-fade-in" data-testid="future-readiness-page">
        {/* Hero Header — soft blue gradient, text-only, brand blue title */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-100 mb-10 sm:mb-12 bg-gradient-to-br from-blue-50 via-white to-white">
          <div className="relative text-center px-6 sm:px-10 py-10 sm:py-14">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4"
              style={{ color: '#4EC0F4' }}
            >
              Future Readiness Assessment
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover how prepared you are for the future of learning, careers, and life.
            </p>
          </div>
        </section>

        {/* Intro Card — soft gradient, refined brand-blue accent */}
        <section className="relative rounded-xl border border-premium p-7 sm:p-10 mb-10 sm:mb-12 shadow-premium text-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white">
          <div
            className="absolute top-0 left-0 bottom-0 w-[5px] rounded-l-xl"
            style={{ background: '#4EC0F4' }}
            aria-hidden="true"
          />
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed max-w-3xl mx-auto">
            This assessment helps you understand the skills, mindset, and abilities needed to thrive in a fast-changing world.
          </p>
        </section>

        {/* What we explore */}
        <section className="mb-10 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              What we explore
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Five key dimensions that shape future success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {dimensions.map((d) => (
              <FeatureCard key={d.title} {...d} />
            ))}
          </div>
        </section>

        {/* What you will get */}
        <section className="mb-10 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              What you will get
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Practical insights to help you prepare for the future.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {insights.map((i) => (
              <FeatureCard key={i.title} {...i} />
            ))}
          </div>
        </section>

        {/* Quick Info */}
        <section className="mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {quickInfo.map((q) => (
              <div
                key={q.label}
                className="bg-blue-50/40 rounded-xl border border-premium shadow-premium p-4 flex items-center justify-center gap-3"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-blue-100">
                  <q.icon className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-800">{q.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Report — highlighted */}
        <section className="relative rounded-2xl border border-blue-100 shadow-lg p-6 sm:p-10 mb-10 sm:mb-12 bg-gradient-to-br from-blue-50 via-white to-white overflow-hidden">
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8">
            <div className="text-center sm:text-left min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 tracking-tight">
                Sample Report
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Preview how your future readiness insights will be presented.
              </p>
            </div>
            <a
              href="#"
              className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all text-sm sm:text-base shadow-sm"
              data-testid="future-readiness-view-sample-report-btn"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Sample Report</span>
            </a>
          </div>
        </section>

        {/* Primary CTA */}
        <section className="text-center py-4 sm:py-6">
          <Link
            to="/future-readiness-assessment/start"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ background: '#4EC0F4' }}
            data-testid="future-readiness-start-cta"
          >
            <Sparkles className="w-5 h-5" />
            <span>See How Future-Ready You Are</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default FutureReadinessAssessment;
