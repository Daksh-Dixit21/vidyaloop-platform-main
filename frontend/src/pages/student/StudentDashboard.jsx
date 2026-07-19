import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentAPI, assessmentAPI } from '../../services/api';

const SECTIONS = [
  { key: 'personality', icon: '🧠', label: 'Personality Profile', dims: 5, questions: 30, color: '#4EC0F4', desc: 'Social Energy, Discipline, Curiosity, Empathy, Resilience' },
  { key: 'learning_style', icon: '📚', label: 'Learning Style Profile', dims: 5, questions: 30, color: '#8b5cf6', desc: 'Visual, Practical, Independent, Collaborative, Structured vs Exploratory' },
  { key: 'skills_abilities', icon: '⚡', label: 'Skills & Abilities', dims: 6, questions: 36, color: '#22c55e', desc: 'Verbal, Numerical, Logical, Creative, Spatial, Leadership' },
  { key: 'career_interests', icon: '🚀', label: 'Career Interests', dims: 6, questions: 36, color: '#f59e0b', desc: 'Investigative, Artistic, Social, Enterprising, Conventional, Realistic' },
];

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const res = await studentAPI.getDashboard();
      setData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStart = async () => {
    setStarting(true);
    try {
      const res = await assessmentAPI.start();
      navigate('/student/assessment', { state: { assessmentId: res.data.assessment_id, progress: res.data.progress, answers: res.data.answers } });
    } catch (err) { alert(err.response?.data?.detail || 'Failed to start'); }
    finally { setStarting(false); }
  };

  const handleContinue = async () => {
    if (data?.current_assessment) {
      try {
        const res = await assessmentAPI.start();
        navigate('/student/assessment', {
          state: {
            assessmentId: data.current_assessment.id,
            progress: data.current_assessment.progress,
            answers: res.data.answers,
          }
        });
      } catch {
        navigate('/student/assessment', {
          state: {
            assessmentId: data.current_assessment.id,
            progress: data.current_assessment.progress,
          }
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#4EC0F4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const student = data?.student || {};
  const current = data?.current_assessment;
  const completed = data?.completed_count || 0;
  const sectionsDone = current?.progress ? Object.values(current.progress).filter(Boolean).length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="glass-card sticky top-0 z-50 border-b border-white/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold gradient-text">VidyaLoop</span>
            <span className="text-xs text-gray-400 hidden sm:inline">Student Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:inline">{student.name}</span>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-red-500 transition">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8 page-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {student.name}!
          </h1>
          <p className="text-gray-400 mt-1">Class {student.section || ''} {student.class_level || ''}</p>
        </div>

        {/* Current Assessment or Start/Retake */}
        <div className="glass-card rounded-2xl p-6 mb-8 border-l-4" style={{ borderColor: current ? '#4EC0F4' : completed > 0 ? '#22c55e' : '#4EC0F4' }}>
          {current ? (
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Assessment In Progress</h3>
                <p className="text-sm text-gray-400">{sectionsDone}/4 sections completed</p>
                <div className="flex gap-2 mt-3">
                  {SECTIONS.map(s => (
                    <div key={s.key} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${current.progress?.[s.key] ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {current.progress?.[s.key] ? '✓' : s.icon}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleContinue} className="px-5 py-2.5 bg-gradient-to-r from-[#4EC0F4] to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg active:scale-[0.98] transition-all">
                Continue →
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {completed > 0 ? 'Take Another Assessment' : 'Take Your Assessment'}
                </h3>
                <p className="text-gray-400 text-sm">22 Dimensions · 12 Career Themes · 4 Sections</p>
              </div>
              <button
                onClick={handleStart}
                disabled={starting}
                className="px-6 py-2.5 bg-gradient-to-r from-[#4EC0F4] to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 active:scale-[0.98] whitespace-nowrap"
              >
                {starting ? 'Starting...' : completed > 0 ? 'Retake →' : 'Start →'}
              </button>
            </div>
          )}
        </div>

        {/* Section Cards */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Sections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SECTIONS.map((sec, i) => (
            <div
              key={sec.key}
              className="glass-card rounded-2xl p-5 stagger-item hover:shadow-lg transition-shadow cursor-default"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md" style={{ background: `${sec.color}15` }}>
                  {sec.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{sec.label}</h4>
                  <p className="text-xs text-gray-400 mt-1">{sec.desc}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span>{sec.dims} dimensions</span>
                    <span>{sec.questions} questions</span>
                  </div>
                </div>
                {current?.progress?.[sec.key] && (
                  <span className="text-green-500 text-sm font-medium">✓ Done</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completed Reports */}
        {completed > 0 && (
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Your Reports ({completed})</h3>
            <div className="space-y-2">
              {data?.reports?.map((r, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/student/assessment/result', { state: { assessmentId: r.id } })}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                >
                  <div>
                    <span className="font-medium text-sm">Comprehensive Report</span>
                    <span className="text-xs text-gray-400 ml-2">{r.completed_at?.split('T')[0]}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: r.overall_score >= 76 ? '#22c55e' : r.overall_score >= 51 ? '#3b82f6' : '#f59e0b' }}>
                    {r.overall_score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

