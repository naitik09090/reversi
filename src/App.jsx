import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import { useTheme } from './hooks/useTheme';
import './App.css';

// Lazy load heavy components
const GameController = lazy(() => import('./components/GameController'));

import { useSearchParams } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleStartGame = (mode) => {
    navigate(`/play?mode=${mode}`);
  };
  return <HeroSection onStartGame={handleStartGame} />;
}

function GamePage() {
  const { theme, toggleTheme } = useTheme();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || '2p';

  return <GameController key={mode} theme={theme} onToggleTheme={toggleTheme} initialMode={mode} />;
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Suspense fallback={<div className="loading-screen">Loading Game...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<GamePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;