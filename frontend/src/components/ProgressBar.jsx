import React from 'react';

const ProgressBar = ({ progress, className = '', showLabel = true, height = 'h-2' }) => {
  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 mt-1 block">{progress}% complete</span>
      )}
    </div>
  );
};

export default ProgressBar;
