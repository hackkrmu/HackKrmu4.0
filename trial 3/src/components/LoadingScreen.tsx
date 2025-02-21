import React from 'react';
import { Leaf } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-cream flex flex-col items-center justify-center z-50">
      <div className="relative">
        <Leaf className="w-16 h-16 text-nectar animate-bounce-slow" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-nectar rounded-full opacity-30 animate-pulse-slow"></div>
      </div>
      <h1 className="mt-6 text-4xl font-bold text-brown">LumiBin</h1>
      <p className="mt-2 text-sepia">Loading your eco-friendly experience...</p>
      <div className="mt-8 relative w-48 h-1 bg-sand rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-nectar animate-loading-bar"></div>
      </div>
    </div>
  );
};