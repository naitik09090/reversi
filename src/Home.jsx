import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';

export default function Home() {
  const navigate = useNavigate();
  const handleStartGame = (mode) => {
    navigate(`/play?mode=${mode}`);
  };
  return <HeroSection onStartGame={handleStartGame} />;
}
