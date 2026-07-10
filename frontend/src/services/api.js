import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
      localStorage.removeItem('vidyaloop_token');
      localStorage.removeItem('vidyaloop_user');
      window.location.href = '/student/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
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
  getStudents: (params) => api.get('/api/admin/students', { params }),
  getStudent: (id) => api.get(`/api/admin/students/${id}`),
  getCredentials: () => api.get('/api/admin/credentials'),
  getDashboard: () => api.get('/api/admin/dashboard'),
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
  viewReport: (id) => `${API_BASE}/api/reports/${id}/view`,
};

export default api;
