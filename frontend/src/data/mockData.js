// Mock data for VidyaLoop platform

export const userData = {
  name: "Aarav",
  class: "Class 10",
  school: "DAV Public School",
  stats: {
    streak: 5,
    hoursThisWeek: 12,
    ranking: "Top 15%"
  }
};

export const learningDNA = {
  strengths: [
    { name: "Logical Thinking", score: 92 },
    { name: "Creativity", score: 85 },
    { name: "Problem Solving", score: 88 }
  ],
  weaknesses: [
    { name: "Algebra", score: 45 },
    { name: "Communication", score: 52 }
  ]
};

export const aiRecommendation = {
  title: "AI Recommendation for You",
  message: "Focus on Algebra and start Python — your logical thinking (92%) makes Python perfect, while strengthening Algebra (45%) unlocks advanced math.",
  actions: [
    { label: "Start Python", link: "/course" },
    { label: "Fix Algebra", link: "/course" }
  ]
};

export const continueLearnig = {
  icon: "Calculator",
  iconColor: "from-blue-500 to-indigo-600",
  title: "Mathematics – Class 10",
  module: "Module 9: Trigonometry Basics",
  progress: 72
};

export const myCourses = [
  {
    id: 1,
    icon: "Calculator",
    iconColor: "from-emerald-500 to-green-600",
    title: "Mathematics – Class 10",
    modules: "8/12 modules",
    progress: 72
  },
  {
    id: 2,
    icon: "Code",
    iconColor: "from-blue-500 to-indigo-600",
    title: "Introduction to Python",
    modules: "3/8 modules",
    progress: 45
  },
  {
    id: 3,
    icon: "Atom",
    iconColor: "from-purple-500 to-pink-600",
    title: "Science – Physics Basics",
    modules: "9/10 modules",
    progress: 88
  }
];

export const recommendedCourses = [
  {
    id: 1,
    icon: "PenTool",
    iconColor: "from-rose-500 to-pink-600",
    title: "Foundation Mathematics",
    subtitle: "Targets: Algebra (weak area)",
    badge: "Improves weak areas",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
    reason: "Your Algebra score is 45% — this course strengthens your fundamentals with adaptive exercises."
  },
  {
    id: 2,
    icon: "Terminal",
    iconColor: "from-green-500 to-emerald-600",
    title: "Introduction to Python",
    subtitle: "Builds on: Problem Solving, Logical Thinking",
    badge: "Matches your strengths",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
    reason: "Your Problem Solving score is 88% — Python programming is the perfect next step for you."
  },
  {
    id: 3,
    icon: "Users",
    iconColor: "from-amber-500 to-orange-600",
    title: "Communication Mastery",
    subtitle: "Targets: Communication (weak area)",
    badge: "Improves weak areas",
    badgeColor: "bg-blue-50 text-blue-700 border border-blue-200",
    reason: "Your Communication score is 52% — this course will boost your presentation and writing skills."
  }
];
