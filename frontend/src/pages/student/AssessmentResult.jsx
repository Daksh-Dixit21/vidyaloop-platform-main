import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { assessmentAPI, reportAPI } from '../../services/api';

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

const SECTIONS = [
  { key: 'personality', icon: '🧠', label: 'Personality', dims: ['social_energy', 'conscientiousness', 'curiosity', 'collaboration', 'adaptability'], color: '#4EC0F4' },
  { key: 'learning_style', icon: '📚', label: 'Learning Style', dims: ['visual_learning', 'experiential_learning', 'independent_learning', 'collaborative_learning', 'structured_vs_exploratory'], color: '#8b5cf6' },
  { key: 'skills_abilities', icon: '⚡', label: 'Skills & Abilities', dims: ['verbal_ability', 'numerical_ability', 'logical_reasoning', 'creative_thinking', 'spatial_ability', 'leadership_potential'], color: '#22c55e' },
  { key: 'career_interests', icon: '🚀', label: 'Career Interests', dims: ['investigative_interest', 'artistic_interest', 'social_interest', 'enterprising_interest', 'conventional_interest', 'realistic_interest'], color: '#f59e0b' },
];

const getScoreColor = (pct) => pct >= 76 ? '#22c55e' : pct >= 51 ? '#3b82f6' : pct >= 26 ? '#f59e0b' : '#ef4444';
const getScoreGradient = (pct) => pct >= 76 ? 'from-green-400 to-emerald-500' : pct >= 51 ? 'from-blue-400 to-indigo-500' : pct >= 26 ? 'from-amber-400 to-orange-500' : 'from-red-400 to-rose-500';

export default function AssessmentResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId, scores, overall_score: stateOverall, report_id: stateReportId } = location.state || {};
  const [downloading, setDownloading] = useState(false);
  const [fetching, setFetching] = useState(!scores && !!assessmentId);
  const [result, setResult] = useState({ scores, overall_score: stateOverall, report_id: stateReportId });

  useEffect(() => {
    if (!scores && assessmentId) {
      assessmentAPI.getResult(assessmentId)
        .then(res => setResult({
          scores: res.data.scores,
          overall_score: res.data.overall_score,
          report_id: res.data.report_id,
        }))
        .catch(err => console.error('Failed to load result:', err))
        .finally(() => setFetching(false));
    }
  }, [assessmentId]);

  const activeScores = result.scores;
  const activeOverall = result.overall_score;
  const activeReportId = result.report_id;

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#4EC0F4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!activeScores) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 mb-4">No results found</p>
          <button onClick={() => navigate('/student/dashboard')} className="text-[#4EC0F4] hover:underline font-medium">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const dimensions = activeScores.dimensions || {};
  const themes = activeScores.themes || {};
  const themeRankings = activeScores.theme_rankings || [];
  const frs = activeScores.future_readiness_score || 0;
  const fsi = activeScores.future_success_index || 0;
  const topStrengths = activeScores.top_strengths || [];
  const growthAreas = activeScores.growth_areas || [];


  const handleViewReport = async () => {
    if (!activeReportId) return;
    try {
      const res = await reportAPI.viewReportBlob(activeReportId);
      const type = res.headers['content-type'] || 'text/html';
      const url = window.URL.createObjectURL(new Blob([res.data], { type }));
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      alert('Report not available yet');
    }
  };

  const handleDownload = async () => {
    if (!activeReportId) return;
    setDownloading(true);
    try {
      const res = await reportAPI.downloadReport(activeReportId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `VidyaLoop_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch { alert('Report not available yet'); }
    finally { setDownloading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="glass-card sticky top-0 z-50 border-b border-white/30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <span className="font-semibold text-gray-700 text-sm">Assessment Results</span>
          <button onClick={() => navigate('/student/dashboard')} className="text-sm text-gray-400 hover:text-gray-600">Dashboard</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Overall Score */}
        <div className="text-center mb-8 page-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎉 Assessment Complete!
          </div>
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={getScoreColor(activeOverall)} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(activeOverall / 100) * 314} 314`} className="score-ring" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: getScoreColor(activeOverall) }}>{activeOverall}%</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">22 Dimensions Analyzed</p>
        </div>

        {/* FRS & FSI */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: getScoreColor(frs) }}>{frs}%</div>
            <div className="text-xs text-gray-400 mt-1">Future Readiness Score</div>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: getScoreColor(fsi) }}>{fsi}%</div>
            <div className="text-xs text-gray-400 mt-1">Future Success Index</div>
          </div>
        </div>

        {/* Top 3 Themes */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Career Themes</h3>
        <div className="glass-card rounded-2xl p-4 mb-8">
          {themeRankings.slice(0, 3).map((t, i) => (
            <div key={t.theme} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: getScoreColor(t.score) }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-800 text-sm">{t.theme}</span>
                <span className="text-xs text-gray-400 ml-2">{themes[t.theme]?.description}</span>
              </div>
              <span className="font-bold text-sm" style={{ color: getScoreColor(t.score) }}>{t.score}%</span>
            </div>
          ))}
        </div>

        {/* All 12 Themes */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">All 12 Career Themes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
          {themeRankings.map((t) => (
            <div key={t.theme} className="glass-card rounded-xl p-3 text-center">
              <div className="text-lg font-bold" style={{ color: getScoreColor(t.score) }}>{t.score}%</div>
              <div className="text-xs text-gray-500 font-medium">{t.theme}</div>
            </div>
          ))}
        </div>

        {/* Section-by-Section Dimension Scores */}
        {SECTIONS.map((sec) => (
          <div key={sec.key} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>{sec.icon}</span> {sec.label}
            </h3>
            <div className="space-y-3">
              {sec.dims.map((dim) => {
                const d = dimensions[dim];
                if (!d) return null;
                const color = getScoreColor(d.normalized);
                return (
                  <div key={dim} className="glass-card rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700 text-sm">{DIM_LABELS[dim]}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold" style={{ color }}>{d.normalized}%</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${color}15`, color }}>{d.level}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(d.normalized)} transition-all duration-1000`} style={{ width: `${d.normalized}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{d.interpretation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Strengths & Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>💪</span> Top Strengths
            </h4>
            {topStrengths.slice(0, 5).map((d) => (
              <div key={d} className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-gray-700">{DIM_LABELS[d]}</span>
                <span className="text-xs font-bold" style={{ color: getScoreColor(dimensions[d]?.normalized || 0) }}>{dimensions[d]?.normalized}%</span>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🎯</span> Growth Areas
            </h4>
            {growthAreas.slice(0, 5).map((d) => (
              <div key={d} className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm text-gray-700">{DIM_LABELS[d]}</span>
                <span className="text-xs font-bold" style={{ color: getScoreColor(dimensions[d]?.normalized || 0) }}>{dimensions[d]?.normalized}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleViewReport}
            className="flex-1 py-3.5 text-sm font-semibold text-white rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all bg-gradient-to-r from-[#4EC0F4] to-blue-500"
          >
            📄 View Full Report (25+ pages)
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading || !activeReportId}
            className="flex-1 py-3.5 text-sm font-medium text-gray-600 bg-white rounded-xl border hover:bg-gray-50 transition disabled:opacity-40"
          >
            {downloading ? 'Downloading...' : '⬇ Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

