import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Rocket, Calendar, ArrowUpRight } from 'lucide-react';

const APPLY_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSckxbJTebAyr4cQ0xRJANIryLtiV-WKFhFxMwXfnfEu5KATSQ/viewform?usp=dialog';
const CALL_URL = 'https://calendly.com/dhruv-vidyaloop';

const benefits = [
  {
    title: 'Access to Skill-Based Courses',
    description: 'Comprehensive curriculum covering coding, design thinking, communication skills, and more.',
  },
  {
    title: 'AI-Powered Learning Tools',
    description: 'Study Buddy AI, Teacher Assistant, and personalized learning recommendations.',
  },
  {
    title: 'Career Guidance Support',
    description: 'Psychometric assessments, career mapping, and college guidance for students.',
  },
  {
    title: 'Early Adopter Advantage',
    description: 'Special pricing, priority support, and influence over product development.',
  },
  {
    title: 'Real-World Projects',
    description: 'Virtual internships and STEM-based project opportunities for students.',
  },
  {
    title: 'Collaborative Partnership',
    description: "Work directly with our team to customize the platform for your school's needs.",
  },
];

const ForSchools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm sm:text-base"
              data-testid="for-schools-back-home-link"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-14 sm:h-16 lg:h-20" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-sm font-semibold text-indigo-700 mb-6">
            <Rocket className="w-4 h-4" />
            <span>Pilot Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Partner with Vidyaloop
          </h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Join our pilot program and get early access to India's first comprehensive edtech platform built with real feedback from students, teachers, and schools. Be part of shaping the future of education.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Join the Pilot Program?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: '#4EC0F4' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 sm:p-10 shadow-xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Ready to get started?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
              Interested in partnering with Vidyaloop? Apply for early access or schedule a quick call with our team.
            </p>

            <div className="flex flex-col items-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-xl font-bold text-base hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                style={{ background: '#4EC0F4' }}
                data-testid="apply-pilot-program-btn"
              >
                <Rocket className="w-5 h-5" />
                <span>Apply for Pilot Program</span>
                <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <a
                href={CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 rounded-xl font-semibold text-sm sm:text-base hover:bg-blue-50 hover:shadow-md transition-all duration-300"
                style={{ borderColor: '#4EC0F4', color: '#0ea5e9' }}
                data-testid="schedule-call-btn"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Call</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-xs sm:text-[13px] font-medium" style={{color: '#4EC0F4'}}>
            © 2025 VidyaLoop. All rights reserved. Designed with <span className="text-red-500" aria-label="love">❤️</span> in India, for India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ForSchools;
