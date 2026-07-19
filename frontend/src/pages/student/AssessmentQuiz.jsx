import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { assessmentAPI } from '../../services/api';

const SECTIONS = [
  { key: 'personality', icon: '🧠', label: 'Personality Profile', color: '#4EC0F4' },
  { key: 'learning_style', icon: '📚', label: 'Learning Style Profile', color: '#8b5cf6' },
  { key: 'skills_abilities', icon: '⚡', label: 'Skills & Abilities', color: '#22c55e' },
  { key: 'career_interests', icon: '🚀', label: 'Career Interests', color: '#f59e0b' },
];

const DIM_LABELS = {
  social_energy: 'Social Energy', conscientiousness: 'Discipline', curiosity: 'Curiosity',
  collaboration: 'Empathy', adaptability: 'Resilience',
  visual_learning: 'Visual Learning', experiential_learning: 'Practical Learning',
  independent_learning: 'Independent Learning', collaborative_learning: 'Collaborative Learning',
  structured_vs_exploratory: 'Structured vs Exploratory',
  verbal_ability: 'Verbal Ability', numerical_ability: 'Numerical Ability',
  logical_reasoning: 'Logical Reasoning', creative_thinking: 'Creative Thinking',
  spatial_ability: 'Spatial Reasoning', leadership_potential: 'Leadership',
  investigative_interest: 'Investigative', artistic_interest: 'Artistic',
  social_interest: 'Social', enterprising_interest: 'Enterprising',
  conventional_interest: 'Conventional', realistic_interest: 'Realistic',
};

export default function AssessmentQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId, progress: initialProgress } = location.state || {};

  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [progress, setProgress] = useState(initialProgress || {});
  const [sectionComplete, setSectionComplete] = useState(false);

  const sectionKey = SECTIONS[currentSectionIdx]?.key;

  useEffect(() => {
    if (!assessmentId) { navigate('/student/dashboard'); return; }
    loadSection();
  }, [currentSectionIdx]);

  const loadSection = async () => {
    setLoading(true);
    try {
      const res = await assessmentAPI.getSectionQuestions(SECTIONS[currentSectionIdx].key);
      setQuestions(res.data.questions);
      setCurrentQ(0);
      setAnswers({});
      setSectionComplete(false);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
      }
    }, 300);
  }, [currentQ, questions.length]);

  const handleSaveProgress = async () => {
    setSaving(true);
    try {
      const res = await assessmentAPI.saveSection(assessmentId, sectionKey, answers);
      setProgress(res.data.progress);
      setSectionComplete(true);
    } catch (err) { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleNextSection = () => {
    if (currentSectionIdx < SECTIONS.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
    } else {
      setShowConfirm(true);
    }
  };

  const handleSubmitAll = async () => {
    setShowConfirm(false);
    try {
      await assessmentAPI.saveSection(assessmentId, sectionKey, answers);
      const res = await assessmentAPI.submit(assessmentId);
      navigate('/student/assessment/result', {
        state: {
          assessmentId,
          scores: res.data.scores,
          overall_score: res.data.overall_score,
          report_id: res.data.report_id,
        }
      });
    } catch (err) {
      const detail = err.response?.data?.detail || err.message || 'Submission failed';
      alert(typeof detail === 'string' ? detail : JSON.stringify(detail));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#4EC0F4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const question = questions[currentQ];
  const sec = SECTIONS[currentSectionIdx];
  const progressPct = ((currentQ + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="glass-card sticky top-0 z-50 border-b border-white/30">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span>{sec.icon}</span>
              <span className="font-semibold text-gray-700 text-sm">{sec.label}</span>
            </div>
            <span className="text-xs text-gray-400">Section {currentSectionIdx + 1}/4</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPct}%`, background: sec.color }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Q{currentQ + 1}/{questions.length}</span>
            <span className="text-xs text-gray-400">{answeredCount} answered</span>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="max-w-3xl mx-auto px-4 mt-4">
        <div className="flex gap-2">
          {SECTIONS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => { if (progress[s.key] || i <= currentSectionIdx) setCurrentSectionIdx(i); }}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                i === currentSectionIdx ? 'text-white shadow-lg' :
                progress[s.key] ? 'bg-green-100 text-green-600' : 'bg-white/50 text-gray-400'
              }`}
              style={i === currentSectionIdx ? { background: s.color } : {}}
            >
              {s.icon} {s.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {sectionComplete ? (
          <div className="glass-card rounded-2xl p-8 text-center page-fade-in">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Section Complete!</h3>
            <p className="text-gray-400 text-sm mb-6">{sec.label} has been saved.</p>
            <button
              onClick={handleNextSection}
              className="px-8 py-3 bg-gradient-to-r from-[#4EC0F4] to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {currentSectionIdx < SECTIONS.length - 1 ? 'Next Section →' : 'Review & Submit'}
            </button>
          </div>
        ) : question ? (
          <div className="glass-card rounded-2xl p-6 page-fade-in" key={question.id}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${sec.color}15`, color: sec.color }}>
                {DIM_LABELS[question.dimension] || question.dimension}
              </span>
              {question.question_type === 'multiple_choice' && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 font-medium">Timed</span>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-5 leading-relaxed whitespace-pre-line">{question.text}</h3>

            {question.question_type === 'multiple_choice' ? (
              <div className="space-y-2">
                {question.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(question.id, opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-medium ${
                      answers[question.id] === opt.id
                        ? 'border-[#4EC0F4] bg-cyan-50 text-[#4EC0F4]'
                        : 'border-gray-100 bg-white/60 hover:border-gray-200 hover:bg-white'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 text-center leading-6 text-xs font-bold"
                      style={answers[question.id] === opt.id ? { borderColor: '#4EC0F4', color: '#4EC0F4' } : { borderColor: '#d1d5db', color: '#9ca3af' }}>
                      {opt.id.toUpperCase()}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {question.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(question.id, opt.value)}
                    className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl border-2 text-center transition-all ${
                      answers[question.id] === opt.value
                        ? 'border-[#4EC0F4] bg-cyan-50 text-[#4EC0F4] font-semibold'
                        : 'border-gray-100 bg-white/60 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="text-sm font-medium">{opt.text}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Question dots */}
            <div className="flex flex-wrap gap-1 mt-5 justify-center">
              {questions.map((q, i) => (
                <div
                  key={q.id || i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentQ ? 'bg-[#4EC0F4] w-4' :
                    answers[q.id] !== undefined ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Save Progress */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleSaveProgress}
                disabled={saving || answeredCount === 0}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition disabled:opacity-40 ${
                  currentQ === questions.length - 1
                    ? 'bg-[#4EC0F4] text-white hover:bg-blue-500 shadow-sm'
                    : 'text-gray-500 bg-white border hover:bg-gray-50'
                }`}
              >
                {saving ? 'Saving...' : currentQ === questions.length - 1 ? '✅ Save & Continue →' : '💾 Save Progress'}
              </button>
              <span className="text-xs text-gray-400">{answeredCount}/{questions.length} answered</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full page-fade-in">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Submit Assessment?</h3>
            <p className="text-gray-400 text-sm mb-4">
              You have completed all 4 sections. Your comprehensive report will be generated.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Cancel</button>
              <button onClick={handleSubmitAll} className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#4EC0F4] to-blue-500 rounded-xl">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

