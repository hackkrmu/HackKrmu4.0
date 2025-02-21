import React from 'react';
import { useStore } from '../store/useStore';
import { Target, Award } from 'lucide-react';

export const Challenges: React.FC = () => {
  const { dailyChallenge, badges, earnedBadges } = useStore();

  return (
    <div className="grid gap-6">
      {dailyChallenge && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Daily Challenge</h2>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{dailyChallenge.title}</h3>
            <p className="text-gray-600">{dailyChallenge.description}</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {Math.round((dailyChallenge.progress / dailyChallenge.target) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${(dailyChallenge.progress / dailyChallenge.target) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Reward: {dailyChallenge.reward} points
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold">Badges</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => {
            const isEarned = earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border ${
                  isEarned ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-medium">{badge.name}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
                {isEarned && (
                  <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Earned!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};