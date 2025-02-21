import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-sepia opacity-30"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-nectar animate-spin absolute top-0 left-0"></div>
      </div>
      <span className="ml-3 text-sepia font-medium animate-pulse">Loading...</span>
    </div>
  );
};