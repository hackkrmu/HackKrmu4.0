import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, startOfDay, isAfter } from 'date-fns';

export interface GarbageLocation {
  id: string;
  lat: number;
  lng: number;
  type: string;
  timestamp: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'points' | 'items' | 'daily';
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: number;
  type: string;
  progress: number;
  completed: boolean;
  expiresAt: number;
}

interface GarbageStore {
  // Points and Items
  points: number;
  detectedItems: string[];
  locations: GarbageLocation[];
  
  // Badges and Achievements
  badges: Badge[];
  earnedBadges: string[];
  
  // Daily Challenges
  dailyChallenge: DailyChallenge | null;
  
  // Environmental Impact
  treesPlanted: number;
  co2Saved: number;
  
  // Stats
  totalItemsCollected: { [key: string]: number };
  streak: number;
  lastActive: number;
  
  // Actions
  addPoints: (points: number) => void;
  addDetectedItem: (item: string, lat: number, lng: number) => void;
  updateDailyChallenge: () => void;
  checkBadges: () => void;
  reportLocation: (location: GarbageLocation) => void;
}

const BADGES: Badge[] = [
  {
    id: 'beginner',
    name: 'Eco Warrior Initiate',
    description: 'Collect your first 100 points',
    icon: '🌱',
    requirement: 100,
    type: 'points'
  },
  {
    id: 'intermediate',
    name: 'Recycling Champion',
    description: 'Collect 1000 points',
    icon: '🏆',
    requirement: 1000,
    type: 'points'
  },
  {
    id: 'expert',
    name: 'Earth Guardian',
    description: 'Plant your first virtual tree (5000 points)',
    icon: '🌳',
    requirement: 5000,
    type: 'points'
  }
];

const createDailyChallenge = (): DailyChallenge => {
  const challenges = [
    {
      title: 'Save the Sea Turtles',
      description: 'Collect 10 plastic items to help protect sea life',
      target: 10,
      reward: 500,
      type: 'plastic'
    },
    {
      title: 'Paper Champion',
      description: 'Recycle 15 paper items',
      target: 15,
      reward: 600,
      type: 'paper'
    },
    {
      title: 'Metal Master',
      description: 'Collect 8 metal items',
      target: 8,
      reward: 400,
      type: 'metal'
    }
  ];

  const challenge = challenges[Math.floor(Math.random() * challenges.length)];
  return {
    ...challenge,
    id: Date.now().toString(),
    progress: 0,
    completed: false,
    expiresAt: addDays(startOfDay(new Date()), 1).getTime()
  };
};

export const useStore = create<GarbageStore>()(
  persist(
    (set, get) => ({
      points: 0,
      detectedItems: [],
      locations: [],
      badges: BADGES,
      earnedBadges: [],
      dailyChallenge: null,
      treesPlanted: 0,
      co2Saved: 0,
      totalItemsCollected: {},
      streak: 0,
      lastActive: Date.now(),

      addPoints: (points) => {
        set((state) => {
          const newPoints = state.points + points;
          const treesPlanted = Math.floor(newPoints / 5000);
          return {
            points: newPoints,
            treesPlanted,
            co2Saved: treesPlanted * 48 // Average CO2 absorption per tree per year in kg
          };
        });
        get().checkBadges();
      },

      addDetectedItem: (item, lat, lng) => {
        const location: GarbageLocation = {
          id: Date.now().toString(),
          lat,
          lng,
          type: item,
          timestamp: Date.now()
        };

        set((state) => ({
          detectedItems: [...state.detectedItems, item],
          locations: [...state.locations, location],
          totalItemsCollected: {
            ...state.totalItemsCollected,
            [item]: (state.totalItemsCollected[item] || 0) + 1
          }
        }));

        // Update daily challenge progress
        const { dailyChallenge } = get();
        if (dailyChallenge && !dailyChallenge.completed && item.toLowerCase().includes(dailyChallenge.type)) {
          set((state) => {
            const updatedChallenge = {
              ...state.dailyChallenge!,
              progress: state.dailyChallenge!.progress + 1
            };
            
            if (updatedChallenge.progress >= updatedChallenge.target) {
              updatedChallenge.completed = true;
              get().addPoints(updatedChallenge.reward);
            }
            
            return { dailyChallenge: updatedChallenge };
          });
        }
      },

      updateDailyChallenge: () => {
        const { dailyChallenge } = get();
        const now = Date.now();
        
        if (!dailyChallenge || isAfter(now, dailyChallenge.expiresAt)) {
          set({ dailyChallenge: createDailyChallenge() });
        }
      },

      checkBadges: () => {
        const { points, badges, earnedBadges } = get();
        
        badges.forEach(badge => {
          if (!earnedBadges.includes(badge.id) && points >= badge.requirement) {
            set((state) => ({
              earnedBadges: [...state.earnedBadges, badge.id]
            }));
          }
        });
      },

      reportLocation: (location) => {
        set((state) => ({
          locations: [...state.locations, location]
        }));
      }
    }),
    {
      name: 'garbage-scanner-storage'
    }
  )
);