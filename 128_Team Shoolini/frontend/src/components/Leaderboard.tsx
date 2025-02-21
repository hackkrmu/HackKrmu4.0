import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const leaderboardData = [
  { id: 1, name: 'EcoWarrior123', points: 5200, items: 156 },
  { id: 2, name: 'GreenHero', points: 4800, items: 142 },
  { id: 3, name: 'RecycleMaster', points: 4500, items: 138 },
  // Add more mock data as needed
];

export const Leaderboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-nectar" />
          <h2 className="text-2xl font-bold text-brown">Global Leaderboard</h2>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((user, index) => {
            const Icon = index === 0 ? Trophy : index === 1 ? Medal : Award;
            const colors = [
              'text-yellow-500',
              'text-gray-400',
              'text-amber-600'
            ];

            return (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 bg-cream rounded-lg"
              >
                <div className={`${colors[index]} text-2xl font-bold w-8`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-brown">{user.name}</h3>
                  <p className="text-sm text-sepia">{user.items} items collected</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-nectar">{user.points}</p>
                  <p className="text-xs text-sepia">points</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-medium text-brown mb-2">Daily Leaders</h3>
          <p className="text-sm text-sepia">Updated every 24 hours</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-medium text-brown mb-2">Weekly Challenge</h3>
          <p className="text-sm text-sepia">Collect 100 items this week</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-medium text-brown mb-2">Special Events</h3>
          <p className="text-sm text-sepia">Join Earth Day competition</p>
        </div>
      </div>
    </div>
  );
};