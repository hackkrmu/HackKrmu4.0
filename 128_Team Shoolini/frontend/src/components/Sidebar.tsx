import React, { useState } from 'react';
import { 
  Trophy, 
  User, 
  MapPin, 
  Camera, 
  Wallet,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onViewChange, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'camera', icon: Camera, label: 'Scanner' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'dumpPoints', icon: MapPin, label: 'Dump Points' },
    { id: 'payments', icon: Wallet, label: 'Payments' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-cream rounded-full shadow-lg text-brown hover:bg-sand transition-colors duration-200"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`
        fixed top-0 left-0 h-full bg-cream shadow-2xl transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 p-6
      `}>
        <div className="mt-16 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                ${currentView === item.id ? 'bg-nectar text-brown' : 'hover:bg-sand text-sepia'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};