import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WelcomeHeader from '../components/WelcomeHeader';
import LearningDNA from '../components/LearningDNA';
import AIRecommendation from '../components/AIRecommendation';
import ContinueLearning from '../components/ContinueLearning';
import MyCourses from '../components/MyCourses';
import RecommendedCourses from '../components/RecommendedCourses';

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Premium minimal container with mobile-first generous spacing */}
      <div className="space-y-8 sm:space-y-6 page-fade-in pb-8">
        <WelcomeHeader />
        <LearningDNA />
        <AIRecommendation />
        <ContinueLearning />
        <MyCourses />
        <RecommendedCourses />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
