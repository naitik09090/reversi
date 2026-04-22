import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import GameController from './components/GameController';
import { useTheme } from './hooks/useTheme';
import './App.css';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;