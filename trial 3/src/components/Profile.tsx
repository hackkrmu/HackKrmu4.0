import React from 'react';
import { useStore } from '../store/useStore';
import { Trophy, Leaf, Package, CreditCard, Wallet } from 'lucide-react';

export const Profile: React.FC = () => {
  const { points, detectedItems, totalItemsCollected, earnedBadges } = useStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-nectar rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-brown" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brown">Eco Warrior</h2>
            <p className="text-sepia">{points} Points Earned</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cream p-4 rounded-lg">
            <Package className="w-6 h-6 text-sepia mb-2" />
            <h3 className="font-medium text-brown">Items Collected</h3>
            <p className="text-2xl font-bold text-nectar">{detectedItems.length}</p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <Trophy className="w-6 h-6 text-sepia mb-2" />
            <h3 className="font-medium text-brown">Badges Earned</h3>
            <p className="text-2xl font-bold text-nectar">{earnedBadges.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-brown mb-4">Collection History</h3>
        <div className="space-y-3">
          {Object.entries(totalItemsCollected).map(([item, count]) => (
            <div key={item} className="flex items-center justify-between p-3 bg-cream rounded-lg">
              <span className="capitalize text-sepia">{item}</span>
              <span className="font-medium text-brown">{count} items</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-brown mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="p-4 border border-sand rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-brown">UPI Payment</h4>
              <CreditCard className="w-5 h-5 text-sepia" />
            </div>
            <button className="w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Link UPI ID
            </button>
          </div>
          <div className="p-4 border border-sand rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-brown">Crypto Wallet</h4>
              <Wallet className="w-5 h-5 text-sepia" />
            </div>
            <button className="w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};