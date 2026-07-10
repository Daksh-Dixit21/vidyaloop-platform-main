import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function SchoolDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, studentsRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getStudents({ limit: 10 })
      ]);
      setStats(statsRes.data);
      setStudents(studentsRes.data.students || []);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadMsg('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await adminAPI.uploadStudents(formData);
      setUploadMsg(`Success! Created ${res.data.successful} student accounts.`);
      loadData();
    } catch (err) {
      setUploadMsg(`Error: ${err.response?.data?.detail?.message || err.response?.data?.detail || 'Upload failed'}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold" style={{ color: '#4EC0F4' }}>VidyaLoop Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 border-b">
          {['overview', 'students', 'upload', 'credentials'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab
                  ? 'border-[#4EC0F4] text-[#4EC0F4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: stats.total_students, color: 'blue' },
                { label: 'Completed Assessments', value: stats.completed_assessments, color: 'green' },
                { label: 'Pending Assessments', value: stats.pending_assessments, color: 'yellow' },
                { label: 'Average Score', value: `${stats.average_score}%`, color: 'purple' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-800">Students ({students.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Class</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Section</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Assessments</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.class_level}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.section || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.assessment_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Upload Student CSV</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload a CSV file with columns: <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">class</code>, <code className="bg-gray-100 px-1 rounded">section</code> (optional), <code className="bg-gray-100 px-1 rounded">roll_number</code> (optional), <code className="bg-gray-100 px-1 rounded">email</code> (optional)
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#4EC0F4] transition">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleCSVUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-600">{uploading ? 'Uploading...' : 'Click to upload CSV file'}</p>
              </label>
            </div>
            {uploadMsg && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${uploadMsg.startsWith('Success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {uploadMsg}
              </div>
            )}
          </div>
        )}

        {activeTab === 'credentials' && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Generated Credentials</h3>
            <p className="text-sm text-gray-500">Upload students in the Upload tab to generate login credentials.</p>
          </div>
        )}
      </div>
    </div>
  );
}
