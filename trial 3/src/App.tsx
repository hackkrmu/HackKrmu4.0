import { useState, useEffect } from 'react';
import { CameraComponent } from './components/Camera';
import { ScoreBoard } from './components/ScoreBoard';
import { Map } from './components/Map';
import { Challenges } from './components/Challenges';
import { Stats } from './components/Stats';
import { Sidebar } from './components/Sidebar';
import { Profile } from './components/Profile';
import { DumpPoints } from './components/DumpPoints';
import { Leaderboard } from './components/Leaderboard';
import { Payments } from './components/Payments';
import { LoadingScreen } from './components/LoadingScreen';
import { Leaf } from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const { updateDailyChallenge } = useStore();
  const [currentView, setCurrentView] = useState('camera');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateDailyChallenge();
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [updateDailyChallenge]);

  const renderView = () => {
    switch (currentView) {
      case 'camera':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8 animate-fade-in">
              <div className="rounded-lg shadow-lg p-6 bg-sand bg-opacity-50">
                <h2 className="text-xl font-semibold text-brown mb-4">
                  Scan Your Environment
                </h2>
                <p className="text-sepia mb-6">
                  Point your camera at trash items to earn points and help clean the environment.
                  Your location will be recorded to help local cleanup crews.
                </p>
                <CameraComponent />
              </div>
              <Map />
            </div>
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Stats />
              <Challenges />
              <ScoreBoard />
            </div>
          </div>
        );
      case 'profile':
        return <Profile />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'dumpPoints':
        return <DumpPoints />;
      case 'payments':
        return <Payments />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      
      <header className="shadow-sm sticky top-0 z-30 bg-sand">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-nectar animate-bounce-slow" />
            <h1 className="text-2xl font-bold text-brown">
              LumiBin
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  );
}