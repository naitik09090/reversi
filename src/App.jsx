import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import './App.css';

// Lazy load all components to maximize bundle efficiency
const Home = lazy(() => import('./Home'));
const GameController = lazy(() => import('./components/GameController'));

function GamePage() {
  const { theme, toggleTheme } = useTheme();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || '2p';

  return (
    <Suspense fallback={<div className="loading-screen">Preparing Board...</div>}>
      <GameController key={mode} theme={theme} onToggleTheme={toggleTheme} initialMode={mode} />
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Suspense fallback={<div className="loading-screen">Loading Reversi...</div>}>
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