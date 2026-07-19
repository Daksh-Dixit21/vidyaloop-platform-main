import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI, reportAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Download, Eye, FileUp, Filter, LogOut, Pencil, RefreshCw, Save, Search, Upload, Plus, Trash2, FileText, DownloadCloud } from 'lucide-react';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'schools', label: 'Schools' },
  { key: 'students', label: 'Students' },
  { key: 'attempts', label: 'Attempts' },
  { key: 'assessments', label: 'Assessments' },
  { key: 'credentials', label: 'Credentials' },
];

const sectionNames = {
  personality: 'Personality',
  learning_style: 'Learning Style',
  skills_abilities: 'Skills & Abilities',
  career_interests: 'Career Interests',
};

function StatCard({ label, value, tone = '#4EC0F4' }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
      <p className="text-[10px] sm:text-sm text-gray-500 truncate">{label}</p>
      <p className="text-xl sm:text-3xl font-bold text-gray-800 mt-0.5 sm:mt-1" style={{ color: tone }}>{value}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="p-8 text-center text-sm text-gray-400">{text}</div>;
}

export default function SchoolDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [assessmentConfigs, setAssessmentConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [questionUploadMsg, setQuestionUploadMsg] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({ search: '', class_filter: '', school_id: '', status: '' });
  const [questionSection, setQuestionSection] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const fileInputRef = useRef(null);
  const questionFileRef = useRef(null);

  const selectedQuestion = useMemo(
    () => questions.find((q) => q._id === editingQuestion) || null,
    [questions, editingQuestion]
  );

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    if (activeTab === 'students' || activeTab === 'attempts') loadFilteredData();
  }, [activeTab, filters.school_id, filters.class_filter, filters.status]);
  useEffect(() => { if (activeTab === 'assessments') loadQuestions(); }, [questionSection, activeTab, selectedAssessmentId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, schoolsRes, studentsRes, assessmentsRes, credentialsRes, configsRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getSchools(),
        adminAPI.getStudents({ limit: 20 }),
        adminAPI.getAssessments({ limit: 20 }),
        adminAPI.getCredentials(),
        adminAPI.getAssessmentConfigs(),
      ]);
      setStats(statsRes.data);
      setSchools(schoolsRes.data.schools || []);
      setStudents(studentsRes.data.students || []);
      setAssessments(assessmentsRes.data.assessments || []);
      setCredentials(credentialsRes.data.batches || []);
      setAssessmentConfigs(configsRes.data.configs || []);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFilteredData = async () => {
    try {
      const params = {
        limit: 50,
        search: filters.search || undefined,
        class_filter: filters.class_filter || undefined,
        school_id: filters.school_id || undefined,
        status: filters.status || undefined,
      };
      const [studentsRes, assessmentsRes] = await Promise.all([
        adminAPI.getStudents(params),
        adminAPI.getAssessments(params),
      ]);
      setStudents(studentsRes.data.students || []);
      setAssessments(assessmentsRes.data.assessments || []);
    } catch (err) {
      console.error('Failed to load filtered data:', err);
    }
  };

  const loadQuestions = async () => {
    try {
      const params = { section: questionSection || undefined };
      if (selectedAssessmentId) params.assessment_id = selectedAssessmentId;
      const res = await adminAPI.getQuestionBank(params);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const handleStudentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await adminAPI.uploadStudents(formData);
      setUploadMsg(`Created ${res.data.successful} student accounts. Credential batch: ${res.data.batch_id}`);
      await loadData();
      setActiveTab('credentials');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setUploadMsg(`Error: ${detail?.message || detail || 'Upload failed'}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleQuestionUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setQuestionUploadMsg('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await adminAPI.uploadQuestionBank(formData, selectedAssessmentId || undefined);
      setQuestionUploadMsg(`${res.data.saved} questions saved${res.data.errors?.length ? `, ${res.data.errors.length} rows skipped` : ''}.`);
      await loadQuestions();
      await loadData();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setQuestionUploadMsg(`Error: ${detail?.message || detail || 'Question upload failed'}`);
    } finally {
      if (questionFileRef.current) questionFileRef.current.value = '';
    }
  };

  const downloadCredentials = async (batchId) => {
    const res = await adminAPI.downloadCredentials(batchId);
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `vidyaloop_credentials_${batchId}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const saveQuestion = async () => {
    if (!selectedQuestion) return;
    const text = document.getElementById('question-text').value;
    await adminAPI.updateQuestion(selectedQuestion._id, { ...selectedQuestion, text });
    setEditingQuestion(null);
    await loadQuestions();
  };

  const applySearch = async (e) => {
    e?.preventDefault();
    await loadFilteredData();
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold truncate" style={{ color: '#4EC0F4' }}>VidyaLoop Admin</h1>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate hidden sm:block">Schools, students, assessments, reports</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline truncate max-w-[120px]">{user?.name}</span>
            <button onClick={loadData} className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="Refresh"><RefreshCw size={15} /></button>
            <button onClick={() => { logout(); navigate('/school/login'); }} className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 text-red-500" title="Logout"><LogOut size={15} /></button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 border-b pb-2 sm:pb-0 -mx-3 sm:mx-0 px-3 sm:px-0">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg sm:rounded-none sm:border-b-2 whitespace-nowrap transition ${activeTab === tab.key ? 'bg-[#4EC0F4]/10 text-[#4EC0F4] sm:bg-transparent sm:border-[#4EC0F4]' : 'bg-gray-100 text-gray-600 sm:bg-transparent sm:border-transparent hover:text-gray-700 sm:hover:bg-transparent'}`}>{tab.label}</button>
          ))}
        </div>

        {activeTab === 'overview' && stats && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              <StatCard label="Schools" value={stats.total_schools || 0} />
              <StatCard label="Students" value={stats.total_students || 0} />
              <StatCard label="Completed" value={stats.completed_assessments || 0} tone="#22c55e" />
              <StatCard label="Pending" value={stats.pending_assessments || 0} tone="#f59e0b" />
              <StatCard label="Avg Score" value={`${stats.average_score || 0}%`} tone="#8b5cf6" />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
              <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Students By Grade</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                {(stats.by_grade || []).map((g) => <div key={g._id} className="rounded-lg bg-gray-50 p-2 sm:p-3 text-center"><p className="text-[10px] sm:text-xs text-gray-400">Grade {g._id}</p><p className="text-base sm:text-lg font-bold text-gray-800">{g.count}</p></div>)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 sm:p-4 border-b"><h3 className="font-semibold text-gray-800 text-sm sm:text-base">Schools</h3></div>
            {schools.length === 0 ? <EmptyState text="No schools found." /> : (
              <div className="divide-y">
                {schools.map((s) => (
                  <div key={s._id} className="p-3 sm:p-4 grid grid-cols-2 sm:table-row sm:border-b-0 gap-1 sm:gap-0">
                    <div className="sm:hidden text-[10px] text-gray-400 font-medium">School</div>
                    <div className="sm:hidden text-[10px] text-gray-400 font-medium">Details</div>
                    <div className="text-sm font-medium text-gray-800">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.contact_email || '-'} &middot; {s.student_count} students &middot; {s.completed_assessments} done</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'students' || activeTab === 'attempts') && (
          <div className="space-y-3 sm:space-y-4">
            <form onSubmit={applySearch} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
              <div className="relative sm:col-span-2"><Search size={14} className="absolute left-3 top-2.5 text-gray-400" /><input value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Search students" className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-100" /></div>
              <select value={filters.school_id} onChange={(e) => setFilters({ ...filters, school_id: e.target.value })} className="px-3 py-2 border rounded-lg text-sm w-full"><option value="">All schools</option>{schools.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}</select>
              <select value={filters.class_filter} onChange={(e) => setFilters({ ...filters, class_filter: e.target.value })} className="px-3 py-2 border rounded-lg text-sm w-full"><option value="">All grades</option>{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>Grade {i + 1}</option>)}</select>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4EC0F4] text-white rounded-lg text-sm font-medium"><Filter size={14} /> Apply</button>
            </form>

            {activeTab === 'students' && <StudentsTable students={students} />}
            {activeTab === 'attempts' && <AssessmentsTable assessments={assessments} filters={filters} setFilters={setFilters} />}
          </div>
        )}

        {activeTab === 'assessments' && <AssessmentsManager
          assessmentConfigs={assessmentConfigs}
          setAssessmentConfigs={setAssessmentConfigs}
          questions={questions}
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
          selectedQuestion={selectedQuestion}
          questionSection={questionSection}
          setQuestionSection={setQuestionSection}
          questionUploadMsg={questionUploadMsg}
          questionFileRef={questionFileRef}
          handleQuestionUpload={handleQuestionUpload}
          saveQuestion={saveQuestion}
          loadQuestions={loadQuestions}
          loadData={loadData}
          setActiveTab={setActiveTab}
          setUploadMsg={setUploadMsg}
          selectedAssessmentId={selectedAssessmentId}
          setSelectedAssessmentId={setSelectedAssessmentId}
        />}

        {activeTab === 'credentials' && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Upload Students</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Upload CSV or Excel with columns: name, class, section, roll_number, email, gender. Student accounts are seeded into MongoDB and a credential CSV is generated.</p>
              <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleStudentUpload} className="hidden" id="student-upload" />
              <label htmlFor="student-upload" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-[#4EC0F4] to-blue-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm cursor-pointer w-full sm:w-auto justify-center"><FileUp size={16} /> {uploading ? 'Uploading...' : 'Upload student file'}</label>
              {uploadMsg && <div className={`mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${uploadMsg.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{uploadMsg}</div>}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 sm:p-4 border-b"><h3 className="font-semibold text-gray-800 text-sm sm:text-base">Credential Batches</h3></div>
              {credentials.length === 0 ? <EmptyState text="No credential batches yet." /> : <div className="divide-y">{credentials.map((b) => <div key={b._id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"><div className="min-w-0"><p className="font-medium text-xs sm:text-sm text-gray-800 break-all">{b._id}</p><p className="text-[10px] sm:text-xs text-gray-400">{b.count} students / {b.created_at?.split('T')[0] || '-'}</p></div><button onClick={() => downloadCredentials(b._id)} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-600 hover:bg-gray-50 w-full sm:w-auto"><Download size={14} /> Download CSV</button></div>)}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentsTable({ students }) {
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-3 sm:p-4 border-b"><h3 className="font-semibold text-gray-800 text-sm sm:text-base">Students ({students.length})</h3></div>
    {students.length === 0 ? <EmptyState text="No students match these filters." /> : (
      <div className="sm:overflow-x-auto">
        {/* Mobile card view */}
        <div className="block sm:hidden divide-y">
          {students.map((s) => (
            <div key={s._id} className="p-3 space-y-1">
              <p className="font-medium text-sm text-gray-800">{s.name}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>Grade {s.class_level}</span>
                <span>Sec {s.section || '-'}</span>
                <span>{s.email}</span>
                <span>{s.assessment_count || 0} assessments</span>
                <span>{s.latest_assessment_status || '-'}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <table className="hidden sm:table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Grade</th>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Section</th>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Email</th>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Assessments</th>
              <th className="text-left px-4 py-3 text-sm text-gray-500">Latest</th>
            </tr>
          </thead>
          <tbody className="divide-y">{students.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.class_level}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.section || '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.assessment_count || 0}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.latest_assessment_status || '-'}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    )}
  </div>;
}

function AssessmentsTable({ assessments, filters, setFilters }) {
  const openReport = async (reportId) => {
    if (!reportId) return;
    try {
      const res = await reportAPI.viewReportBlob(reportId);
      const type = res.headers['content-type'] || 'application/pdf';
      const url = window.URL.createObjectURL(new Blob([res.data], { type }));
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      alert('Report is not available yet.');
    }
  };

  const downloadReport = async (reportId, studentName = 'student') => {
    if (!reportId) return;
    try {
      const res = await reportAPI.downloadReport(reportId);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `VidyaLoop_Report_${studentName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Report download is not available yet.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-3 sm:p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Assessment Attempts ({assessments.length})</h3>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm w-full sm:w-auto">
          <option value="">All statuses</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {assessments.length === 0 ? <EmptyState text="No assessment attempts match these filters." /> : (
        <div>
          {/* Mobile cards */}
          <div className="block sm:hidden divide-y">
            {assessments.map((a) => (
              <div key={a._id} className="p-3 space-y-1">
                <p className="font-medium text-sm text-gray-800">{a.student?.name || '-'}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
                  <span>{a.school?.name || '-'}</span>
                  <span>Grade {a.student?.class_level || '-'}</span>
                  <span className={`font-medium ${a.status === 'completed' ? 'text-green-600' : a.status === 'in_progress' ? 'text-amber-600' : 'text-gray-400'}`}>{a.status}</span>
                  <span>{a.overall_score ? `${a.overall_score}%` : '-'}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  {a.report_id ? (
                    <>
                      <button onClick={() => openReport(a.report_id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] hover:bg-gray-50"><Eye size={12} /> View</button>
                      <button onClick={() => downloadReport(a.report_id, a.student?.name)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] hover:bg-gray-50"><Download size={12} /> PDF</button>
                    </>
                  ) : <span className="text-[10px] text-gray-400">No report</span>}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Student</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">School</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Grade</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Score</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Completed</th>
                  <th className="text-left px-4 py-3 text-sm text-gray-500">Report</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {assessments.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{a.student?.name || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{a.school?.name || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{a.student?.class_level || '-'}</td>
                    <td className="px-4 py-3 text-sm"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.status === 'completed' ? 'bg-green-100 text-green-700' : a.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600">{a.overall_score ? `${a.overall_score}%` : '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{a.completed_at?.split('T')[0] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {a.report_id ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => openReport(a.report_id)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs hover:bg-gray-50" title="View report"><Eye size={14} /> View</button>
                          <button onClick={() => downloadReport(a.report_id, a.student?.name)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs hover:bg-gray-50" title="Download PDF"><Download size={14} /> PDF</button>
                        </div>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function AssessmentsManager({ assessmentConfigs, setAssessmentConfigs, questions, editingQuestion, setEditingQuestion, selectedQuestion, questionSection, setQuestionSection, questionUploadMsg, questionFileRef, handleQuestionUpload, saveQuestion, loadQuestions, loadData, setActiveTab, setUploadMsg, selectedAssessmentId, setSelectedAssessmentId }) {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('comprehensive');
  const [creating, setCreating] = useState(false);

  const createAssessment = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await adminAPI.createAssessmentConfig({ name: newName.trim(), assessment_type: newType });
      setAssessmentConfigs(prev => [res.data.config, ...prev]);
      setNewName('');
      setSelectedAssessmentId(res.data.config._id);
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create assessment');
    } finally {
      setCreating(false);
    }
  };

  const deleteConfig = async (id) => {
    if (!confirm('Delete this assessment config? Questions will be unassigned.')) return;
    try {
      await adminAPI.deleteAssessmentConfig(id);
      setAssessmentConfigs(prev => prev.filter(c => c._id !== id));
      if (selectedAssessmentId === id) setSelectedAssessmentId(null);
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete assessment');
    }
  };

  const filteredQuestions = questions.filter(q =>
    selectedAssessmentId ? q.assessment_id === selectedAssessmentId : !q.assessment_id
  );

  const downloadCsvTemplate = () => {
    const header = 'id,section,dimension,text,question_type,options,correct_answer,reverse_scored,weight,assessment_id';
    const rows = [
      'q_example_1,personality,curiosity,"I enjoy trying new things",likert_5,,,,,',
      'q_example_2,skills_abilities,verbal_ability,"Choose the synonym of candid",multiple_choice,"Frank|Silent|Late|Careful",a,,,',
      'q_example_3,learning_style,visual_learning,"I learn best by watching",likert_5,,,,,',
      'q_example_4,career_interests,investigative,"I enjoy solving puzzles",likert_5,,,,,',
    ];
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vidyaloop_question_template.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_360px] gap-3 sm:gap-4">
      {/* Left: Assessment configs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 sm:p-4 border-b">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Assessment Configs</h3>
        </div>
        <div className="p-3 sm:p-4 border-b space-y-2">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Assessment name" className="w-full px-3 py-1.5 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-100" />
          <div className="flex gap-2">
            <select value={newType} onChange={(e) => setNewType(e.target.value)} className="flex-1 px-2 py-1.5 border rounded-lg text-xs sm:text-sm">
              <option value="comprehensive">Comprehensive</option>
              <option value="personality">Personality</option>
              <option value="skills">Skills</option>
              <option value="custom">Custom</option>
            </select>
            <button onClick={createAssessment} disabled={creating || !newName.trim()} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#4EC0F4] text-white rounded-lg text-xs sm:text-sm font-medium disabled:opacity-50"><Plus size={14} /> {creating ? '...' : 'Create'}</button>
          </div>
        </div>
        <div className="divide-y max-h-[300px] overflow-auto">
          {assessmentConfigs.length === 0 && <p className="p-4 text-xs text-gray-400 text-center">No assessments yet</p>}
          {assessmentConfigs.map(c => (
            <div key={c._id} className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-50 ${selectedAssessmentId === c._id ? 'bg-cyan-50' : ''}`} onClick={() => setSelectedConfig(c._id)}>
              <div className="min-w-0">
                <p className="font-medium text-xs sm:text-sm text-gray-800 truncate">{c.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-400">{c.assessment_type} &middot; {c.question_count || 0} questions</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteConfig(c._id); }} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 shrink-0"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div className="p-3 sm:p-4 border-t">
          <button onClick={() => setSelectedConfig(null)} className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm ${!selectedAssessmentId ? 'bg-cyan-50 text-cyan-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>Unassigned Questions</button>
        </div>
      </div>

      {/* Center: Questions list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 sm:p-4 border-b flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              {selectedAssessmentId
                ? (assessmentConfigs.find(c => c._id === selectedAssessmentId)?.name || 'Assessment') + ' Questions'
                : 'Unassigned Questions'}
              <span className="text-gray-400 font-normal ml-1">({filteredQuestions.length})</span>
            </h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={questionSection} onChange={(e) => setQuestionSection(e.target.value)} className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm flex-1 sm:flex-none"><option value="">All sections</option>{Object.entries(sectionNames).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
            <input ref={questionFileRef} type="file" accept=".csv,.xlsx,.xls,.json" className="hidden" onChange={handleQuestionUpload} id="question-upload" />
            <label htmlFor="question-upload" className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm cursor-pointer"><Upload size={14} /> Upload</label>
            <button onClick={downloadCsvTemplate} className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-600 hover:bg-gray-50"><DownloadCloud size={14} /> Template</button>
          </div>
        </div>
        {questionUploadMsg && <div className={`mx-3 sm:mx-4 mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${questionUploadMsg.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{questionUploadMsg}</div>}
        <div className="divide-y max-h-[400px] sm:max-h-[600px] overflow-auto">
          {filteredQuestions.length === 0 && <p className="p-4 text-xs text-gray-400 text-center">No questions. Upload a CSV/Excel file or create a new assessment.</p>}
          {filteredQuestions.map((q) => <button key={q._id} onClick={() => setEditingQuestion(q._id)} className={`w-full text-left p-3 sm:p-4 hover:bg-gray-50 ${editingQuestion === q._id ? 'bg-cyan-50' : ''}`}><div className="flex justify-between gap-2"><p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">{q.text}</p><Pencil size={13} className="text-gray-400 shrink-0 mt-0.5" /></div><p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{sectionNames[q.section] || q.section} / {q.dimension} / {q.question_type}</p></button>)}
        </div>
      </div>

      {/* Right: Edit question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 h-fit">
        <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Edit Question</h3>
        {selectedQuestion ? <div className="space-y-2 sm:space-y-3"><p className="text-[10px] sm:text-xs text-gray-400 break-all">{selectedQuestion._id}</p><textarea id="question-text" defaultValue={selectedQuestion.text} className="w-full min-h-32 sm:min-h-40 border rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-100" /><button onClick={saveQuestion} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4EC0F4] text-white rounded-lg text-xs sm:text-sm font-semibold"><Save size={14} /> Save Question</button></div> : <p className="text-xs sm:text-sm text-gray-400">Select a question to edit it.</p>}
      </div>
    </div>
  );
}
