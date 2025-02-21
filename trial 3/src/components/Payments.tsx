import React, { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';

export const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upi' | 'crypto'>('upi');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-brown mb-6">Payments & Rewards</h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('upi')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'upi' ? 'bg-nectar text-brown' : 'bg-cream text-sepia'}`}
          >
            <CreditCard className="w-5 h-5" />
            UPI Payment
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2
              ${activeTab === 'crypto' ? 'bg-nectar text-brown' : 'bg-cream text-sepia'}`}
          >
            <Wallet className="w-5 h-5" />
            Crypto Wallet
          </button>
        </div>

        {activeTab === 'upi' && (
          <div className="space-y-4">
            <div className="p-4 border border-sand rounded-lg">
              <h3 className="font-medium text-brown mb-2">Link UPI ID</h3>
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full p-2 border border-sand rounded-lg mb-3"
              />
              <button className="w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Verify & Link
              </button>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <h3 className="font-medium text-brown mb-2">Rewards Available</h3>
              <p className="text-2xl font-bold text-nectar">₹250</p>
              <p className="text-sm text-sepia">Min. withdrawal: ₹100</p>
            </div>
          </div>
        )}

        {activeTab === 'crypto' && (
          <div className="space-y-4">
            <div className="p-4 border border-sand rounded-lg">
              <h3 className="font-medium text-brown mb-2">Connect Wallet</h3>
              <p className="text-sm text-sepia mb-3">
                Connect your Web3 wallet to receive eco-tokens
              </p>
              <button className="w-full bg-nectar text-brown py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Connect Wallet
              </button>
            </div>
            <div className="p-4 bg-cream rounded-lg">
              <h3 className="font-medium text-brown mb-2">Eco Tokens</h3>
              <p className="text-2xl font-bold text-nectar">50 ECO</p>
              <p className="text-sm text-sepia">1 ECO = 0.1 MATIC</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};