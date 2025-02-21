import React from 'react';
import { useStore } from '../store/useStore';
import { Trophy } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  const { points, detectedItems } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Score</h2>
        <Trophy className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="text-4xl font-bold text-blue-500 mb-4">
        {points} points
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Recently Detected Items:
        </h3>
        <div className="flex flex-wrap gap-2">
          {detectedItems.slice(-5).map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};