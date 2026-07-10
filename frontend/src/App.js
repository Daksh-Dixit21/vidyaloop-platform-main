import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Homepage from "@/pages/Homepage";
import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import Course from "@/pages/Course";
import CourseBrowse from "@/pages/CourseBrowse";
import Tutor from "@/pages/Tutor";
import Career from "@/pages/Career";
import Internships from "@/pages/Internships";
import TeacherAssistant from "@/pages/TeacherAssistant";
import ForSchools from "@/pages/ForSchools";
import PersonalityAssessment from "@/pages/PersonalityAssessment";
import FutureReadinessAssessment from "@/pages/FutureReadinessAssessment";
import SummerGrowthCamp from "@/pages/SummerGrowthCamp";
import ScrollToTop from "@/components/ScrollToTop";
import StudentLogin from "@/pages/auth/StudentLogin";
import SchoolLogin from "@/pages/auth/SchoolLogin";
import ChangePassword from "@/pages/auth/ChangePassword";
import SchoolDashboard from "@/pages/school/SchoolDashboard";
import StudentDashboard from "@/pages/student/StudentDashboard";
import AssessmentQuiz from "@/pages/student/AssessmentQuiz";
import AssessmentResult from "@/pages/student/AssessmentResult";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to={requiredRole === 'school_admin' ? '/school/login' : '/student/login'} />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/course" element={<Course />} />
      <Route path="/stem-learning" element={<CourseBrowse />} />
      <Route path="/tutor" element={<Tutor />} />
      <Route path="/career" element={<Career />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/teacher-assistant" element={<TeacherAssistant />} />
      <Route path="/personality-assessment" element={<PersonalityAssessment />} />
      <Route path="/future-readiness-assessment" element={<FutureReadinessAssessment />} />
      <Route path="/summer-growth-camp" element={<SummerGrowthCamp />} />
      <Route path="/for-schools" element={<ForSchools />} />

      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/school/login" element={<SchoolLogin />} />
      <Route path="/change-password" element={
        <ProtectedRoute><ChangePassword /></ProtectedRoute>
      } />

      <Route path="/school/dashboard" element={
        <ProtectedRoute requiredRole="school_admin"><SchoolDashboard /></ProtectedRoute>
      } />

      <Route path="/student/dashboard" element={
        <ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>
      } />
      <Route path="/assessment" element={
        <ProtectedRoute requiredRole="student"><AssessmentQuiz /></ProtectedRoute>
      } />
      <Route path="/assessment/result" element={
        <ProtectedRoute requiredRole="student"><AssessmentResult /></ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
