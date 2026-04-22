import React from 'react';

/**
 * Hero Section - Optimized for Performance
 * Uses Vanilla CSS animations instead of Framer Motion to reduce the initial JS bundle size
 * by avoiding the need to load the animation library on the landing page.
 */
export default function HeroSection({ onStartGame }) {
  return (
    <main className="hero-section" aria-label="Game introduction">
      <div className="hero-content">
        <div className="hero-discs animate-float" aria-hidden="true">
          <div className="hero-disc disc-black">
            <div className="disc-sheen" />
          </div>
          <div className="hero-disc disc-white">
            <div className="disc-sheen" />
          </div>
        </div>

        <h1 className="hero-title animate-fade-in-up stagger-1">
          <span className="hero-title-main">Reversi</span>
          <span className="hero-title-sub">Classic Othello Board Game</span>
        </h1>

        <p className="hero-desc animate-fade-in-up stagger-2">
          Play Reversi online — the classic strategic board game also known as Othello.
          Challenge a friend or test your skills against our AI opponent.
          Free, no sign-up, no download required.
        </p>

        <div className="hero-buttons animate-fade-in-up stagger-3">
          <button
            className="btn-hero-mode"
            onClick={() => onStartGame('ai')}
            aria-label="Play against AI"
          >
            <span className="btn-icon">🤖</span> AI Opponent
          </button>

          <button
            className="btn-hero-mode"
            onClick={() => onStartGame('2p')}
            aria-label="Play against a friend"
          >
            <span className="btn-icon">🎮</span> 2-Player Mode
          </button>
        </div>

        <p className="hero-seo animate-fade-in-up stagger-4">
          Reversi (Othello) is a two-player strategy game.
          Players flip opponent pieces to win.
        </p>
      </div>
    </main>
  );
}
