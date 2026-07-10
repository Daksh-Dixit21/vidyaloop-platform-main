import React, { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-premium">
      {/* Mobile Header with Hamburger - Premium */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-premium shadow-premium flex items-center justify-between px-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-10" />
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        {/* Platform Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 pb-6 pt-2">
          <div className="max-w-6xl mx-auto text-center border-t border-gray-100 pt-4">
            <p className="text-xs sm:text-[13px] font-medium" style={{color: '#4EC0F4'}}>
              © 2025 VidyaLoop. All rights reserved. Designed with <span className="text-red-500" aria-label="love">❤️</span> in India, for India.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
