import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardCheck, BookOpen, MessageCircle, TrendingUp, LogOut, X, Users, Sun } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Summer Growth Camp', path: '/summer-growth-camp', icon: Sun },
  { name: 'My Learning', path: '/course', icon: BookOpen },
  { name: 'Career Guidance', path: '/assessment', icon: ClipboardCheck },
  { name: 'Study Buddy', path: '/tutor', icon: MessageCircle },
  { name: 'Teacher Assistant', path: '/teacher-assistant', icon: Users },
  { name: 'PAL', path: '/career', icon: TrendingUp },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden lg:flex w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex-col z-30">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-center">
          <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-32" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                style={isActive ? { background: '#4EC0F4' } : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout / Back to Homepage */}
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Homepage</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar - Slide in from left */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <img src="/vidyaloop-logo.png" alt="VidyaLoop" className="h-12" />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                style={isActive ? { background: '#4EC0F4' } : {}}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout / Back to Homepage */}
        <div className="p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-white">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Homepage</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
