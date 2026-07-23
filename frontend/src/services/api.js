import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vidyaloop_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const role = JSON.parse(localStorage.getItem('vidyaloop_user') || '{}').role;
      localStorage.removeItem('vidyaloop_token');
      localStorage.removeItem('vidyaloop_user');
      window.location.href = role === 'school_admin' ? '/school/login' : '/student/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username, password) => api.post('/api/auth/login', { username, email: username, password }),
  adminLogin: (email, password) => api.post('/api/auth/admin/login', { email, password }),
  getMe: () => api.get('/api/auth/me'),
  changePassword: (current_password, new_password) =>
    api.post('/api/auth/change-password', { current_password, new_password }),
};

export const adminAPI = {
  uploadStudents: (formData) => api.post('/api/admin/upload-students', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  previewCSV: (formData) => api.post('/api/admin/preview-csv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadQuestionBank: (formData, assessment_id) => api.post(`/api/admin/question-bank/upload${assessment_id ? `?assessment_id=${assessment_id}` : ''}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getSchools: (params) => api.get('/api/admin/schools', { params }),
  getStudents: (params) => api.get('/api/admin/students', { params }),
  getStudent: (id) => api.get(`/api/admin/students/${id}`),
  getCredentials: () => api.get('/api/admin/credentials'),
  downloadCredentials: (batchId) => api.get(`/api/admin/credentials/${batchId}/download`, { responseType: 'blob' }),
  getAssessments: (params) => api.get('/api/admin/assessments', { params }),
  getAssessmentTaker: (id) => api.get(`/api/admin/assessments/${id}/takers`),
  getQuestionBank: (params) => api.get('/api/admin/question-bank', { params }),
  updateQuestion: (id, data) => api.put(`/api/admin/question-bank/${id}`, data),
  getDashboard: () => api.get('/api/admin/dashboard'),
  getAssessmentConfigs: () => api.get('/api/admin/assessment-configs'),
  createAssessmentConfig: (data) => api.post('/api/admin/assessment-configs', data),
  updateAssessmentConfig: (id, data) => api.put(`/api/admin/assessment-configs/${id}`, data),
  deleteAssessmentConfig: (id) => api.delete(`/api/admin/assessment-configs/${id}`),
};

export const studentAPI = {
  getDashboard: () => api.get('/api/student/dashboard'),
  getAssessments: () => api.get('/api/student/assessments'),
  getReports: () => api.get('/api/student/reports'),
};

export const assessmentAPI = {
  getTypes: () => api.get('/api/assessments/types'),
  getSections: () => api.get('/api/assessments/sections'),
  getQuestions: () => api.get('/api/assessments/questions'),
  getSectionQuestions: (section) => api.get(`/api/assessments/questions/${section}`),
  start: () => api.post('/api/assessments/start'),
  saveSection: (assessmentId, section, answers) =>
    api.post(`/api/assessments/${assessmentId}/save-section`, { section, answers }),
  submit: (assessmentId) => api.post(`/api/assessments/${assessmentId}/submit`),
  getResult: (assessmentId) => api.get(`/api/assessments/${assessmentId}/result`),
};

export const reportAPI = {
  getReport: (id) => api.get(`/api/reports/${id}`),
  downloadReport: (id) => api.get(`/api/reports/${id}/download`, { responseType: 'blob' }),
  viewReportBlob: (id) => api.get(`/api/reports/${id}/view`, { responseType: 'blob' }),
};

export default api;





