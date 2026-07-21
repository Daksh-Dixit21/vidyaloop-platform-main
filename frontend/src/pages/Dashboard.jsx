import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { studentAPI } from '../services/api';
import WelcomeHeader from '../components/WelcomeHeader';
import LearningDNA from '../components/LearningDNA';
import AIRecommendation from '../components/AIRecommendation';
import ContinueLearning from '../components/ContinueLearning';
import MyCourses from '../components/MyCourses';
import RecommendedCourses from '../components/RecommendedCourses';
import {
  userData as mockUserData,
  learningDNA as mockDNA,
  aiRecommendation as mockAI,
  continueLearnig as mockContinue,
  myCourses as mockCourses,
  recommendedCourses as mockRecommended,
} from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      studentAPI.getDashboard()
        .then(res => setBackendData(res.data))
        .catch(() => setBackendData(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const student = backendData?.student;

  const userInfo = user
    ? {
        ...mockUserData,
        name: student?.name || user.name,
        class: student?.class_level ? `Class ${student.class_level}` : mockUserData.class,
        school: student?.section || 'VidyaLoop Student',
      }
    : mockUserData;

  const dnaStrengths = student?.strengths || mockDNA.strengths;
  const dnaWeaknesses = student?.weaknesses || mockDNA.weaknesses;
  const recommendation = backendData?.recommendation || mockAI;
  const continueItem = backendData?.continue_learning || mockContinue;
  const inProgressCourses = backendData?.courses || mockCourses;
  const suggestedCourses = backendData?.recommended_courses || mockRecommended;

  return (
    <DashboardLayout>
      <div className="space-y-8 sm:space-y-6 page-fade-in pb-8">
        <WelcomeHeader userInfo={userInfo} />
        <LearningDNA strengths={dnaStrengths} weaknesses={dnaWeaknesses} />
        <AIRecommendation data={recommendation} />
        <ContinueLearning data={continueItem} />
        <MyCourses courses={inProgressCourses} />
        <RecommendedCourses courses={suggestedCourses} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
