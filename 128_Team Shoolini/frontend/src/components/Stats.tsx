import React from 'react';
import { useStore } from '../store/useStore';
import { TreePine, Leaf } from 'lucide-react';

export const Stats: React.FC = () => {
  const { points, treesPlanted, co2Saved, totalItemsCollected } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-5 h-5 text-green-600" />
            <span className="font-medium">Virtual Trees</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{treesPlanted}</p>
          <p className="text-sm text-green-600">Planted</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-blue-600" />
            <span className="font-medium">CO₂ Saved</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{co2Saved}kg</p>
          <p className="text-sm text-blue-600">Equivalent</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏆</span>
            <span className="font-medium">Total Points</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{points}</p>
          <p className="text-sm text-purple-600">Earned</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-3">Items Collected</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(totalItemsCollected).map(([item, count]) => (
            <div key={item} className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <span className="capitalize">{item}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};