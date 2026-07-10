import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import {
  Sun,
  Sparkles,
  ArrowRight,
  Eye,
  Heart,
  Brain,
  Rocket,
  MessageCircle,
  UserCircle2,
  Activity,
  Award,
  BarChart3,
  FileText,
  TrendingUp,
  ShieldCheck,
  School,
  Users,
  Briefcase,
  Lightbulb,
  Smile,
  Wand2,
  Layers,
  CheckCircle2,
  Flame,
  NotebookPen,
  HelpCircle,
  Video,
  Mic,
  Calendar,
  Star,
  Smartphone,
  Gamepad2,
  Code2,
  Palette,
  Database,
  Cloud,
  Share2,
  Trophy,
  Medal,
  Gift,
  Sword,
  Map as MapIcon,
  Zap,
  Megaphone,
  Hash,
  Search,
  Lock,
  ScanLine,
  Fingerprint,
  Camera,
} from 'lucide-react';

const BRAND = '#4EC0F4';

/* ----------------------------------------------------------------
 * Building blocks
 * ----------------------------------------------------------------*/

const Eyebrow = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-blue-100 shadow-sm">
    {Icon && <Icon className="w-3.5 h-3.5" style={{ color: BRAND }} />}
    <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase" style={{ color: '#0ea5e9' }}>
      {children}
    </span>
  </div>
);

const SectionTitle = ({ eyebrow, eyebrowIcon, title, description, align = 'center', titleColor }) => (
  <div className={`mb-10 sm:mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {eyebrow && (
      <div className={`mb-4 ${align === 'center' ? 'flex justify-center' : ''}`}>
        <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      </div>
    )}
    <h2
      className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.15] pb-1 mb-3 sm:mb-4 max-w-3xl mx-auto"
      style={titleColor ? { color: titleColor } : { color: '#111827' }}
    >
      {title}
    </h2>
    {description && (
      <p className="text-[15px] sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

/* ----------------------------------------------------------------
 * Data
 * ----------------------------------------------------------------*/

const whyCards = [
  {
    icon: Smile,
    title: 'Beyond marks & exams',
    description: 'Confidence, self-awareness, and emotional growth that exams cannot measure.',
    accent: BRAND,
  },
  {
    icon: ShieldCheck,
    title: 'Less pressure, more clarity',
    description: 'Tools to handle stress, distractions, and uncertainty about the future.',
    accent: '#6366f1',
  },
  {
    icon: Lightbulb,
    title: 'Future-ready skills',
    description: 'Communication, adaptability, and digital readiness schools and parents value.',
    accent: '#8b5cf6',
  },
];

const assessments = [
  {
    icon: UserCircle2,
    tag: 'Self · Identity',
    title: 'Personality Assessment',
    description: 'Confidence, communication style, decision-making, self-awareness, and personal growth areas.',
    accent: BRAND,
    gradient: 'from-sky-50 via-white to-white',
    take: 'https://new-updated-vert.vercel.app/',
    sample: '/reports/Vidyaloop_Report_Aryan.pdf',
  },
  {
    icon: Activity,
    tag: 'Emotion · Wellbeing',
    title: 'Emotional Balance Assessment',
    description: 'Emotional resilience, stress handling, awareness, self-control, and social-emotional comfort.',
    accent: '#ec4899',
    gradient: 'from-pink-50 via-white to-white',
    take: 'https://eba-report-dkmt.vercel.app/',
    sample: '/reports/Vidyaloop-Aryan-Report.pdf',
  },
  {
    icon: Rocket,
    tag: 'Future · Skills',
    title: 'Future Readiness Assessment',
    description: 'Growth mindset, adaptability, initiative, problem-solving, digital readiness, and future skills.',
    accent: '#6366f1',
    gradient: 'from-indigo-50 via-white to-white',
    take: 'https://fba-report-1.vercel.app/assessment',
    sample: '/reports/aryan-future-readiness-report.pdf',
  },
];

const reportFeatures = [
  { icon: TrendingUp, label: 'Strengths & growth areas' },
  { icon: BarChart3, label: 'Visual growth charts' },
  { icon: FileText, label: 'AI-generated insights' },
  { icon: Award, label: 'Action steps & next courses' },
];

const audienceCards = [
  {
    icon: School,
    label: 'For Schools',
    title: 'A summer that complements academics',
    points: ['Drives holistic growth', 'Engagement during breaks', 'Trackable student outcomes'],
    accent: BRAND,
  },
  {
    icon: Users,
    label: 'For Parents',
    title: 'A summer that builds the whole child',
    points: ['Confidence & communication', 'Less screen, more growth', 'Visible progress reports'],
    accent: '#10b981',
  },
];

/* ----------------------------------------------------------------
 * Mini radar chart (SVG)
 * ----------------------------------------------------------------*/

const RadarChart = ({ values }) => {
  // values: [confidence, balance, communication, future, awareness]
  const labels = ['Confidence', 'Balance', 'Comms', 'Future', 'Awareness'];
  const cx = 110;
  const cy = 110;
  const radius = 86;
  const sides = values.length;

  const point = (i, ratio) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    return [cx + radius * ratio * Math.cos(angle), cy + radius * ratio * Math.sin(angle)];
  };

  const polygon = (ratio) =>
    Array.from({ length: sides }, (_, i) => point(i, ratio).join(','))
      .join(' ');

  const dataPolygon = values.map((v, i) => point(i, v / 100).join(',')).join(' ');

  return (
    <svg viewBox="0 0 220 220" className="w-full h-full">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4EC0F4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={polygon(r)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: sides }, (_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      <polygon
        points={dataPolygon}
        fill="url(#radarFill)"
        stroke="#4EC0F4"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {values.map((v, i) => {
        const [x, y] = point(i, v / 100);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#4EC0F4" stroke="white" strokeWidth="1.5" />;
      })}
      {labels.map((l, i) => {
        const [x, y] = point(i, 1.18);
        return (
          <text
            key={l}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="600"
            fill="#6b7280"
          >
            {l}
          </text>
        );
      })}
    </svg>
  );
};

/* ----------------------------------------------------------------
 * Cards
 * ----------------------------------------------------------------*/

const AssessmentCard = ({ a, index }) => {
  const Icon = a.icon;
  return (
    <div
      className={`group relative bg-gradient-to-br ${a.gradient} rounded-3xl p-7 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_60px_rgba(78,192,244,0.18)] border border-white/80 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full overflow-hidden premium-fade-up premium-delay-${index + 1}`}
      style={{ borderColor: 'rgba(78,192,244,0.15)' }}
    >
      {/* Floating glow */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${a.accent}55 0%, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: `linear-gradient(135deg, ${a.accent}, ${a.accent}cc)` }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
        </div>
        <span
          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
          style={{ color: a.accent, background: `${a.accent}14` }}
        >
          {a.tag}
        </span>
      </div>

      <h3 className="relative font-bold text-gray-900 mb-3 text-lg sm:text-xl tracking-tight leading-snug">
        {a.title}
      </h3>
      <p className="relative text-sm text-gray-600 leading-relaxed mb-7 flex-1">
        {a.description}
      </p>

      <div className="relative flex flex-col gap-2.5 mt-auto">
        <a
          href={a.take}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:scale-[1.02] transition-all"
          style={{ background: a.accent }}
          data-testid={`sgc-take-${a.title.toLowerCase().replace(/\s+/g, '-')}-btn`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Take Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={a.sample}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/80 backdrop-blur border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-white hover:border-gray-300 transition-all"
          data-testid={`sgc-sample-${a.title.toLowerCase().replace(/\s+/g, '-')}-btn`}
        >
          <Eye className="w-4 h-4" />
          <span>View Sample Report</span>
        </a>
      </div>
    </div>
  );
};

const WhyCard = ({ c, index }) => {
  const Icon = c.icon;
  return (
    <div
      className={`group relative bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-500 premium-fade-up premium-delay-${index + 1}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${c.accent}14` }}
      >
        <Icon className="w-5 h-5" style={{ color: c.accent }} strokeWidth={1.8} />
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg tracking-tight">{c.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
    </div>
  );
};

const AudienceCard = ({ c, index }) => {
  const Icon = c.icon;
  return (
    <div
      className={`group relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-white via-white to-blue-50/40 border border-blue-100/70 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_50px_rgba(78,192,244,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden premium-fade-up premium-delay-${index + 1}`}
    >
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.accent}55 0%, transparent 70%)` }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: c.accent }}>
            {c.label}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-5">
          {c.title}
        </h3>
        <ul className="space-y-2.5">
          {c.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: c.accent }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------
 * Page
 * ----------------------------------------------------------------*/

const SummerGrowthCamp = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto" data-testid="summer-growth-camp-page">
        {/* ---------------- Hero ---------------- */}
        <section className="relative rounded-[2rem] overflow-hidden mb-16 sm:mb-24 border border-blue-100 bg-gradient-to-br from-white via-sky-50/50 to-white">
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid-bg opacity-60 pointer-events-none" />

          {/* Glow blobs */}
          <div
            className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-50 pointer-events-none glow-float"
            style={{ background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full blur-3xl opacity-40 pointer-events-none glow-float"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', animationDelay: '2s' }}
          />

          <div className="relative px-6 sm:px-12 py-14 sm:py-24 text-center">
            <div className="mb-6 sm:mb-7 flex justify-center premium-fade-up">
              <Eyebrow icon={Sun}>Summer Growth Camp · Powered by AI</Eyebrow>
            </div>

            <h1
              className="text-[34px] sm:text-5xl lg:text-[64px] font-bold tracking-tight leading-[1.2] pb-2 mb-6 sm:mb-8 max-w-4xl mx-auto premium-fade-up premium-delay-1"
              style={{
                background: 'linear-gradient(180deg, #0ea5e9 0%, #4EC0F4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Transform summer vacations into a growth experience.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed premium-fade-up premium-delay-2">
              A modern, AI-powered student growth platform that turns idle screen time into confidence, emotional strength, and future readiness.
            </p>

            {/* Trust strip */}
            <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 max-w-2xl mx-auto premium-fade-up premium-delay-3">
              {[
                { icon: Heart, label: 'Emotional Strength' },
                { icon: MessageCircle, label: 'Communication' },
                { icon: Brain, label: 'Self-Awareness' },
                { icon: Rocket, label: 'Future Readiness' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-gray-500">
                  <t.icon className="w-4 h-4" style={{ color: BRAND }} />
                  <span className="text-[13px] sm:text-sm font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Three Growth Assessments (FOCAL) ---------------- */}
        <section className="relative mb-16 sm:mb-24">
          {/* Spotlight backdrop */}
          <div
            className="absolute inset-x-0 -top-10 sm:-top-20 h-[520px] rounded-[3rem] pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(60% 50% at 50% 30%, rgba(78,192,244,0.18) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <SectionTitle
            eyebrow="The Core Growth Suite · 3 Assessments"
            eyebrowIcon={Wand2}
            title="Self-discovery built for the AI generation."
            description="Short, engaging, and student-friendly — each assessment opens a window into how your child thinks, feels, and grows."
            titleColor={BRAND}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {assessments.map((a, i) => (
              <AssessmentCard key={a.title} a={a} index={i} />
            ))}
          </div>
        </section>

        {/* ---------------- More Than Just Assessments ---------------- */}
        <section className="mb-16 sm:mb-24">
          <SectionTitle
            eyebrow="Beyond Assessments"
            eyebrowIcon={Star}
            title="More than just assessments."
            description="Summer Growth Camp also includes interactive growth activities designed to help students build habits, self-awareness, confidence, reflection, communication, and future-ready thinking."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* 1. Daily Growth Challenges */}
            <div className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white via-orange-50/30 to-white border border-orange-100/70 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)] hover:-translate-y-1 transition-all duration-500 overflow-hidden premium-fade-up premium-delay-1">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                   style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.55) 0%, transparent 70%)' }} />
              <div className="relative flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}
                >
                  <Flame className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ color: '#c2410c', background: 'rgba(249,115,22,0.12)' }}>
                  Daily · Habit
                </span>
              </div>
              <h3 className="relative font-bold text-gray-900 mb-2 text-lg sm:text-xl tracking-tight">
                Daily Growth Challenges
              </h3>
              <p className="relative text-sm text-gray-600 leading-relaxed mb-5">
                Simple daily activities designed to help students build confidence, discipline, communication skills, emotional awareness, and positive habits through small real-world actions.
              </p>
              {/* Visual hint: 7-day streak */}
              <div className="relative flex items-center justify-between bg-white/80 backdrop-blur rounded-xl border border-orange-100 px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5,6,7].map((d, i) => (
                    <div
                      key={d}
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold ${i < 5 ? 'text-white' : 'text-gray-400'}`}
                      style={i < 5 ? { background: 'linear-gradient(135deg, #f97316, #f59e0b)' } : { background: '#f3f4f6' }}
                    >
                      {i < 5 ? '✓' : d}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#c2410c' }}>
                  <Flame className="w-3.5 h-3.5" />
                  <span>5 day streak</span>
                </div>
              </div>
            </div>

            {/* 2. Growth Journal & Reflection Space */}
            <div className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white via-violet-50/30 to-white border border-violet-100/70 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-500 overflow-hidden premium-fade-up premium-delay-2">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                   style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 70%)' }} />
              <div className="relative flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
                >
                  <NotebookPen className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ color: '#6d28d9', background: 'rgba(139,92,246,0.12)' }}>
                  Reflect · Private
                </span>
              </div>
              <h3 className="relative font-bold text-gray-900 mb-2 text-lg sm:text-xl tracking-tight">
                Growth Journal &amp; Reflection
              </h3>
              <p className="relative text-sm text-gray-600 leading-relaxed mb-5">
                A private reflection space where students can track thoughts, emotions, personal growth, challenges, wins, and self-awareness through guided prompts and journaling.
              </p>
              {/* Visual hint: today's prompt card */}
              <div className="relative bg-white/80 backdrop-blur rounded-xl border border-violet-100 px-3.5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#7c3aed' }}>
                  Today's prompt
                </p>
                <p className="text-xs sm:text-[13px] text-gray-700 leading-snug">
                  "What is one small thing you did today that made you feel proud?"
                </p>
              </div>
            </div>

            {/* 3. Weekly Mini Quizzes */}
            <div className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white via-emerald-50/30 to-white border border-emerald-100/70 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.18)] hover:-translate-y-1 transition-all duration-500 overflow-hidden premium-fade-up premium-delay-3">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                   style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.55) 0%, transparent 70%)' }} />
              <div className="relative flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  <HelpCircle className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ color: '#047857', background: 'rgba(16,185,129,0.12)' }}>
                  Weekly · Discover
                </span>
              </div>
              <h3 className="relative font-bold text-gray-900 mb-2 text-lg sm:text-xl tracking-tight">
                Weekly Mini Quizzes
              </h3>
              <p className="relative text-sm text-gray-600 leading-relaxed mb-5">
                Fun and engaging self-discovery quizzes focused on learning styles, communication, confidence, leadership, habits, decision-making, and future readiness.
              </p>
              {/* Visual hint: quiz progress */}
              <div className="relative bg-white/80 backdrop-blur rounded-xl border border-emerald-100 px-3.5 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-gray-700">Communication style quiz</span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color: '#047857' }}>4 / 10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-emerald-50 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '40%', background: 'linear-gradient(90deg, #10b981, #059669)' }} />
                </div>
              </div>
            </div>

            {/* 4. Live Sessions & AMA Experiences */}
            <div className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white via-sky-50/30 to-white border border-blue-100/70 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_60px_rgba(78,192,244,0.22)] hover:-translate-y-1 transition-all duration-500 overflow-hidden premium-fade-up premium-delay-4">
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                   style={{ background: 'radial-gradient(circle, rgba(78,192,244,0.55) 0%, transparent 70%)' }} />
              <div className="relative flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                >
                  <Video className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ color: '#0369a1', background: 'rgba(78,192,244,0.14)' }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-sky-500"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
                  </span>
                  Live · Mentors
                </span>
              </div>
              <h3 className="relative font-bold text-gray-900 mb-2 text-lg sm:text-xl tracking-tight">
                Live Sessions &amp; AMA Experiences
              </h3>
              <p className="relative text-sm text-gray-600 leading-relaxed mb-5">
                Interactive live sessions with mentors, experts, creators, educators, and future-ready professionals designed to help students learn beyond academics.
              </p>
              {/* Visual hint: upcoming session */}
              <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur rounded-xl border border-blue-100 px-3.5 py-3">
                <div className="flex -space-x-2">
                  {['#4EC0F4','#6366f1','#8b5cf6'].map((c, i) => (
                    <div key={c} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm" style={{ background: c }}>
                      {['MR','SK','AT'][i]}
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-900 truncate">"How to think like a founder" — Mentor AMA</p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>Sat · 6:00 PM</span>
                  </p>
                </div>
                <Mic className="w-4 h-4 flex-shrink-0" style={{ color: BRAND }} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Build Something Real — Creator Tracks (FLAGSHIP) ---------------- */}
        <section className="relative mb-16 sm:mb-24">
          {/* Spotlight backdrop */}
          <div
            className="absolute inset-x-0 -top-10 sm:-top-20 h-[560px] rounded-[3rem] pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 30%, rgba(99,102,241,0.16) 0%, rgba(255,255,255,0) 70%)',
            }}
          />

          <SectionTitle
            eyebrow="India's Young Creator Challenge"
            eyebrowIcon={Zap}
            title="Build something real this summer."
            description="Don't just consume technology this summer — create it. Learn step-by-step, build your own app or game, and showcase your creation to the world."
          />

          {/* Launch teaser strip */}
          <div className="-mt-6 sm:-mt-10 mb-10 sm:mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase px-3.5 py-2 rounded-full border bg-white launch-glow"
                  style={{ color: BRAND, borderColor: 'rgba(78,192,244,0.5)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: BRAND }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: BRAND }}></span>
              </span>
              Launching June 8
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-gray-600">
              <Sparkles className="w-3 h-3" style={{ color: BRAND }} />
              From Idea → Launch
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-gray-600">
              <Star className="w-3 h-3" style={{ color: '#f59e0b' }} />
              Creator Challenges Coming Soon
            </span>
          </div>

          {/* Two flagship tracks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* TRACK 1 — App Builder Challenge */}
            <div className="group relative rounded-[2rem] overflow-hidden border border-blue-100/70 bg-gradient-to-br from-white via-sky-50/40 to-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_70px_rgba(78,192,244,0.22)] hover:-translate-y-1 transition-all duration-500 premium-fade-up premium-delay-1">
              <div
                className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-80 glow-float"
                style={{ background: 'radial-gradient(circle, rgba(78,192,244,0.6) 0%, transparent 70%)' }}
              />

              <div className="relative p-7 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full" style={{ color: '#0369a1', background: 'rgba(78,192,244,0.12)' }}>
                    <Sparkles className="w-3 h-3" />
                    <span>Track 01 · App</span>
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                  >
                    <Smartphone className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                  App Builder Challenge
                </h3>
                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 sm:mb-7">
                  Learn how modern apps are designed and launched. Students go through a structured creator journey covering app ideas, UI/UX design, AI-assisted development, logic, databases, and deployment — ending with their own live application.
                </p>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-7 sm:mb-8">
                  {[
                    { icon: Sparkles, label: 'Beginner-Friendly Journey' },
                    { icon: Code2, label: 'Build Real Apps Step-by-Step' },
                    { icon: Star, label: 'AI + White Coding Workflow' },
                    { icon: Palette, label: 'UI/UX + App Logic' },
                    { icon: Cloud, label: 'Deploy Your Own App' },
                    { icon: Share2, label: 'Showcase Your Creation' },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-xl border border-blue-100 px-3 py-2"
                    >
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(78,192,244,0.14)' }}
                      >
                        <f.icon className="w-3 h-3" style={{ color: BRAND }} />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-tight">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Mini App Mockup */}
                <div className="gradient-border-card shadow-[0_10px_30px_rgba(78,192,244,0.18)] bg-white p-4 mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}>
                        <Smartphone className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-[11px] font-bold text-gray-900">MyHabitApp.io</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50">Live</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['#4EC0F4','#6366f1','#8b5cf6'].map((c, i) => (
                      <div key={c} className="rounded-lg p-2" style={{ background: `${c}14` }}>
                        <div className="w-4 h-4 rounded-md mb-1.5" style={{ background: c }}></div>
                        <div className="h-1 rounded-full mb-1" style={{ background: c, opacity: 0.6, width: ['80%','60%','90%'][i] }}></div>
                        <div className="h-1 rounded-full" style={{ background: c, opacity: 0.3, width: ['50%','85%','40%'][i] }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-xl group-hover:scale-[1.02] transition-all"
                  style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                  data-testid="sgc-app-builder-cta"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Build Your App</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* TRACK 2 — Game Creator Challenge */}
            <div className="group relative rounded-[2rem] overflow-hidden border border-purple-100/70 bg-gradient-to-br from-white via-violet-50/40 to-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_70px_rgba(139,92,246,0.22)] hover:-translate-y-1 transition-all duration-500 premium-fade-up premium-delay-2">
              <div
                className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-80 glow-float"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', animationDelay: '1.5s' }}
              />

              <div className="relative p-7 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full" style={{ color: '#6d28d9', background: 'rgba(139,92,246,0.12)' }}>
                    <Gamepad2 className="w-3 h-3" />
                    <span>Track 02 · Game</span>
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                  >
                    <Gamepad2 className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug mb-3">
                  Game Creator Challenge
                </h3>
                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed mb-6 sm:mb-7">
                  Students will learn how games are designed, structured, and built using beginner-friendly tools and modern creator workflows. By the end of the summer, they'll publish their own playable game.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-7 sm:mb-8">
                  {[
                    { icon: Palette, label: 'Design Characters & Worlds' },
                    { icon: Code2, label: 'Learn Game Logic' },
                    { icon: MapIcon, label: 'Create Levels & Gameplay' },
                    { icon: Gamepad2, label: 'Build Playable Games' },
                    { icon: Share2, label: 'Publish & Showcase' },
                    { icon: Sword, label: 'Compete With Creators' },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-xl border border-purple-100 px-3 py-2"
                    >
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(139,92,246,0.14)' }}
                      >
                        <f.icon className="w-3 h-3" style={{ color: '#8b5cf6' }} />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-tight">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Mini Game Mockup */}
                <div className="gradient-border-card shadow-[0_10px_30px_rgba(139,92,246,0.18)] bg-white p-4 mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                        <Gamepad2 className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-[11px] font-bold text-gray-900">SkyRunner · Level 3</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.1)' }}>Beta</span>
                  </div>
                  <div className="relative h-14 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(180deg, #c4b5fd 0%, #fbcfe8 100%)' }}>
                    {/* Stylised game scene */}
                    <div className="absolute inset-0 flex items-end gap-1 px-2 pb-1">
                      <div className="w-2 h-3 rounded-sm bg-violet-700 opacity-60"></div>
                      <div className="w-2 h-5 rounded-sm bg-violet-700 opacity-60"></div>
                      <div className="w-2 h-4 rounded-sm bg-violet-700 opacity-60"></div>
                      <div className="w-2 h-6 rounded-sm bg-violet-700 opacity-60"></div>
                      <div className="w-2 h-3 rounded-sm bg-violet-700 opacity-60"></div>
                      <div className="w-2 h-5 rounded-sm bg-violet-700 opacity-60"></div>
                    </div>
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.8)]"></div>
                    {/* Player */}
                    <div className="absolute bottom-2 left-8 w-3 h-3 rounded bg-white shadow-md"></div>
                    {/* HUD */}
                    <div className="absolute top-1 right-2 text-[8px] font-bold text-white tracking-wider bg-black/30 backdrop-blur px-1.5 py-0.5 rounded">
                      ★ 1240
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-xl group-hover:scale-[1.02] transition-all"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                  data-testid="sgc-game-creator-cta"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Create Your Game</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* COMPETITION STRIP — Summer Creator Showcase */}
          <div className="relative rounded-[2rem] overflow-hidden border border-blue-100 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-7 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            {/* Glow blobs */}
            <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 pointer-events-none glow-float"
                 style={{ background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -left-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-30 pointer-events-none glow-float"
                 style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', animationDelay: '2s' }} />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{
                   backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
                   backgroundSize: '22px 22px',
                 }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left content */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 border border-white/15 bg-white/5 backdrop-blur">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-amber-100">
                    Finale · June 30
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.1] mb-3 sm:mb-4 text-white">
                  The Summer Creator Showcase.
                </h3>
                <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed mb-6 sm:mb-7 max-w-xl mx-auto lg:mx-0">
                  At the end of the Summer Growth Camp, students submit their apps and games to the Vidyaloop Creator Showcase. Top projects are featured and rewarded.
                </p>

                {/* Reward chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-w-2xl mx-auto lg:mx-0">
                  {[
                    { icon: Gift, label: 'Prize Money', color: '#fde047' },
                    { icon: Medal, label: 'Winner Recognition', color: '#fb923c' },
                    { icon: Star, label: 'Featured Creator Profiles', color: '#4EC0F4' },
                    { icon: Award, label: 'Certificates & Badges', color: '#a78bfa' },
                    { icon: Share2, label: 'Public Showcase', color: '#34d399' },
                    { icon: Briefcase, label: 'Internship Opportunities', color: '#f472b6' },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur px-3 py-2">
                      <r.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: r.color }} />
                      <span className="text-[11px] sm:text-xs font-semibold text-white/90 leading-tight">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard mockup */}
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-300" />
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">Live Leaderboard</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-300 font-bold">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                      </span>
                      LIVE
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { rank: 1, name: 'Aarav K.', project: 'HabitGym · App', score: 982, medal: '🥇', bg: 'linear-gradient(135deg, #fde047, #f59e0b)' },
                      { rank: 2, name: 'Meera S.', project: 'SkyRunner · Game', score: 941, medal: '🥈', bg: 'linear-gradient(135deg, #e5e7eb, #9ca3af)' },
                      { rank: 3, name: 'Kabir A.', project: 'StudyBuddy · App', score: 902, medal: '🥉', bg: 'linear-gradient(135deg, #f97316, #c2410c)' },
                      { rank: 4, name: 'Sara J.', project: 'PixelQuest · Game', score: 871, medal: '4', bg: 'rgba(255,255,255,0.08)' },
                    ].map((p) => (
                      <div key={p.rank} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-3 py-2.5">
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: p.bg }}>
                          {p.rank <= 3 ? p.medal : p.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-white truncate">{p.name}</p>
                          <p className="text-[10px] text-white/50 truncate">{p.project}</p>
                        </div>
                        <div className="text-[12px] font-bold text-amber-300 tabular-nums">{p.score}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <p className="text-[10px] text-white/60">+ 1,284 student creators</p>
                    <div className="flex -space-x-1.5">
                      {['#4EC0F4','#8b5cf6','#f472b6','#34d399'].map((c) => (
                        <div key={c} className="w-5 h-5 rounded-full border border-slate-900" style={{ background: c }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Real-World Virtual Internships (NEW) ---------------- */}
        <section className="relative mb-16 sm:mb-24">
          {/* Soft spotlight backdrop */}
          <div
            className="absolute inset-x-0 -top-10 sm:-top-20 h-[560px] rounded-[3rem] pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 30%, rgba(99,102,241,0.14) 0%, rgba(255,255,255,0) 70%)',
            }}
          />

          {/* Floating ambient particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left: '8%', delay: '0s', size: 6, color: '#4EC0F4' },
              { left: '18%', delay: '2.4s', size: 4, color: '#8b5cf6' },
              { left: '30%', delay: '4.8s', size: 5, color: '#ec4899' },
              { left: '46%', delay: '1.2s', size: 3, color: '#4EC0F4' },
              { left: '62%', delay: '3.6s', size: 5, color: '#22d3ee' },
              { left: '78%', delay: '6s', size: 4, color: '#8b5cf6' },
              { left: '92%', delay: '0.8s', size: 6, color: '#ec4899' },
            ].map((p, i) => (
              <span
                key={i}
                className="absolute bottom-0 rounded-full particle-drift"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 14px ${p.color}`,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Section title with shimmer badge */}
          <div className="mb-10 sm:mb-14 text-center">
            <div className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-white launch-glow"
                    style={{ color: BRAND, borderColor: 'rgba(78,192,244,0.5)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: BRAND }} />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
                  New for Summer 2026
                </span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-3 sm:mb-4 max-w-3xl mx-auto">
              🚀 Real-World Virtual Internships
            </h2>
            <p className="text-[15px] sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Not just courses — students enter immersive simulations where they solve problems, make decisions, and experience future careers hands-on.
            </p>
          </div>

          {/* Two immersive internship cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {/* CARD 1 — Social Media War Room */}
            <div className="group relative rounded-[2rem] overflow-hidden border border-pink-100/70 bg-gradient-to-br from-white via-pink-50/30 to-amber-50/20 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_28px_70px_rgba(236,72,153,0.22)] hover:-translate-y-1.5 transition-all duration-500 premium-fade-up premium-delay-1">
              {/* Floating glow */}
              <div className="absolute -top-24 -right-20 w-[360px] h-[360px] rounded-full blur-3xl opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-90 glow-float"
                   style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%)' }} />
              {/* Faint social media icons in background */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden">
                <Hash className="absolute top-10 right-12 w-28 h-28 text-pink-600" />
                <Megaphone className="absolute bottom-6 left-4 w-24 h-24 text-amber-500 rotate-[-12deg]" />
                <Camera className="absolute top-32 left-1/3 w-20 h-20 text-rose-500 rotate-6" />
              </div>

              <div className="relative p-7 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                        style={{ color: '#be185d', background: 'rgba(236,72,153,0.12)' }}>
                    <TrendingUp className="w-3 h-3" />
                    <span>Creator · Marketing</span>
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                       style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}>
                    <Megaphone className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight leading-snug mb-2">
                  📱 Social Media War Room
                </h3>
                <p className="text-sm sm:text-[15px] font-semibold text-gray-700 mb-3 leading-snug">
                  Step inside a fast-growing creator agency and manage the internet like a real digital strategist.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Students become part of a high-pressure social media creator agency where they manage influencer campaigns, handle viral content, respond to online controversies, grow channels, and analyze audience behavior.
                </p>

                {/* What students do */}
                <ul className="space-y-2 mb-5">
                  {[
                    'Handle influencer brand deals',
                    'Create viral growth strategies',
                    'Respond to social media controversies',
                    'Analyze audience engagement data',
                    'Manage digital creator campaigns',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ec4899' }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[
                    '🔥 Viral Strategy',
                    '📊 Audience Analytics',
                    '🎥 Creator Economy',
                    '🚀 Growth Hacking',
                  ].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-white border border-pink-100 text-gray-700 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Skills learned */}
                <div className="mb-6 bg-white/70 backdrop-blur rounded-xl border border-pink-100 px-3.5 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#be185d' }}>
                    Skills Learned
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-700 leading-snug">
                    Marketing · Branding · Communication · Analytics · Decision-Making
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-600">
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#ec4899' }} />
                    <span>🗓 Starts June 8, 2026</span>
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white rounded-xl font-bold text-sm hover:shadow-xl group-hover:scale-[1.03] transition-all"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}
                    data-testid="sgc-warroom-cta"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Enter the War Room</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 2 — Cybercrime & AI Detective */}
            <div className="group relative rounded-[2rem] overflow-hidden border border-cyan-200/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 shadow-[0_8px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_28px_70px_rgba(34,211,238,0.25)] hover:-translate-y-1.5 transition-all duration-500 premium-fade-up premium-delay-2">
              {/* Cyber grid background */}
              <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

              {/* Scanline */}
              <div className="absolute inset-x-0 top-0 h-24 overflow-hidden pointer-events-none">
                <div className="w-full h-1 scanline-sweep" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.85), transparent)' }} />
              </div>

              {/* Glow blobs */}
              <div className="absolute -top-24 -right-20 w-[360px] h-[360px] rounded-full blur-3xl opacity-40 pointer-events-none transition-opacity duration-500 group-hover:opacity-70 glow-float"
                   style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)' }} />
              <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full blur-3xl opacity-30 pointer-events-none"
                   style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)' }} />

              <div className="relative p-7 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-cyan-400/30 backdrop-blur"
                        style={{ color: '#67e8f9', background: 'rgba(34,211,238,0.08)' }}>
                    <Lock className="w-3 h-3" />
                    <span>Cyber · Investigate</span>
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                       style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)' }}>
                    <Fingerprint className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug mb-2">
                  🕵️ Cybercrime &amp; AI Detective
                </h3>
                <p className="text-sm sm:text-[15px] font-semibold text-cyan-200/90 mb-3 leading-snug">
                  Investigate deepfakes, cyber scams, and AI manipulation like a digital detective.
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Students work as cyber investigators solving digital crime simulations. They track fake accounts, investigate deepfakes, analyze suspicious behavior, prevent online scams, and solve cyber mystery cases.
                </p>

                <ul className="space-y-2 mb-5">
                  {[
                    'Investigate fake social accounts',
                    'Detect AI-generated deepfakes',
                    'Solve simulated cybercrime cases',
                    'Analyze suspicious online activity',
                    'Learn digital safety techniques',
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-white/85">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-300" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[
                    '🧠 AI Investigation',
                    '🔍 Digital Forensics',
                    '⚠️ Scam Detection',
                    '🛡️ Cyber Safety',
                  ].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border border-white/10 text-white/90 backdrop-blur"
                          style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mb-6 rounded-xl border border-white/10 px-3.5 py-2.5 backdrop-blur" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-cyan-300">
                    Skills Learned
                  </p>
                  <p className="text-xs sm:text-[13px] text-white/85 leading-snug">
                    Cyber Awareness · Logic · Critical Thinking · Digital Safety
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-cyan-200/80">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>🗓 Starts June 8, 2026</span>
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white rounded-xl font-bold text-sm hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-[1.03] transition-all"
                    style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)' }}
                    data-testid="sgc-detective-cta"
                  >
                    <Search className="w-4 h-4" />
                    <span>Start Investigation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="rounded-2xl border border-blue-100 bg-white/70 backdrop-blur-xl shadow-sm p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-4">
              {[
                'Portfolio Projects',
                'Internship Certificates',
                'Team Challenges',
                'AI-Powered Simulations',
                'Real-World Career Skills',
              ].map((label, i, arr) => (
                <React.Fragment key={label}>
                  <div className="inline-flex items-center gap-2 text-[12px] sm:text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4" style={{ color: BRAND }} />
                    <span>{label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-200" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Personalized AI Reports ---------------- */}
        <section className="mb-16 sm:mb-24">
          <div className="relative rounded-[2rem] overflow-hidden border border-blue-100 bg-gradient-to-br from-white via-sky-50/30 to-white p-6 sm:p-12 shadow-[0_8px_40px_rgba(15,23,42,0.04)]">
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)' }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="text-center lg:text-left">
                <div className="mb-5 inline-flex"><Eyebrow icon={Sparkles}>AI-generated insight</Eyebrow></div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-4 sm:mb-5">
                  Personalized growth insights for every student.
                </h2>
                <p className="text-[15px] sm:text-base text-gray-600 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                  Every student receives an AI-generated report with strengths, growth areas, emotional insights, and clear action steps — presented in a friendly, encouraging format.
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto lg:mx-0">
                  {reportFeatures.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2.5 bg-white rounded-xl border border-gray-100 px-3 py-2.5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${BRAND}14` }}
                      >
                        <f.icon className="w-3.5 h-3.5" style={{ color: BRAND }} />
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-gray-800 leading-tight">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report mockup */}
              <div className="gradient-border-card shadow-[0_20px_60px_rgba(78,192,244,0.15)] p-5 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: BRAND }}>
                      Growth Report
                    </p>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">Aarav · Class 10</h4>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #4EC0F4, #6366f1)' }}
                  >
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {/* Radar */}
                  <div className="col-span-2 -ml-2">
                    <div className="aspect-square">
                      <RadarChart values={[88, 76, 82, 91, 73]} />
                    </div>
                  </div>

                  {/* Bars + insight */}
                  <div className="col-span-3">
                    <div className="space-y-3">
                      {[
                        { label: 'Confidence', value: 88, color: BRAND },
                        { label: 'Emotional Balance', value: 76, color: '#10b981' },
                        { label: 'Communication', value: 82, color: '#6366f1' },
                        { label: 'Future Readiness', value: 91, color: '#8b5cf6' },
                      ].map((b) => (
                        <div key={b.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-700">{b.label}</span>
                            <span className="text-[11px] sm:text-xs font-bold text-gray-900 tabular-nums">{b.value}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${b.value}%`, background: b.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND }} />
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Top strength:</span> Future Readiness · <span className="font-semibold text-gray-900">Next focus:</span> Communication boost via the Emotional Balance journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="relative rounded-[2rem] overflow-hidden mb-6 border border-blue-100 bg-gradient-to-br from-white via-sky-50/50 to-white p-8 sm:p-16 text-center shadow-[0_8px_40px_rgba(15,23,42,0.04)]">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #4EC0F4 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="mb-5 inline-flex"><Eyebrow icon={Sparkles}>Partner with Vidyaloop</Eyebrow></div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-4 sm:mb-5 max-w-3xl mx-auto">
              Help students return more confident, aware & future-ready.
            </h2>
            <p className="text-[15px] sm:text-base text-gray-600 max-w-xl mx-auto mb-9 leading-relaxed">
              Bring Summer Growth Camp to your entire school. We work directly with educators to shape a meaningful break.
            </p>
            <div className="flex justify-center">
              <Link
                to="/for-schools"
                className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ background: BRAND }}
                data-testid="sgc-final-partner-btn"
              >
                <Briefcase className="w-5 h-5" />
                <span>Partner With Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SummerGrowthCamp;
