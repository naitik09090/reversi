import React from 'react';
import { m } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const discVariants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function HeroSection({ onStartGame }) {
  return (
    <main className="hero-section" aria-label="Game introduction">
      <m.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div
          className="hero-discs"
          aria-hidden="true"
          variants={discVariants}
          animate="animate"
        >
          <div className="hero-disc disc-black"><div className="disc-sheen" /></div>
          <div className="hero-disc disc-white"><div className="disc-sheen" /></div>
        </m.div>

        <m.h1 className="hero-title" variants={itemVariants}>
          <span className="hero-title-main">Reversi</span>
          <span className="hero-title-sub">Classic Othello Board Game</span>
        </m.h1>

        <m.p className="hero-desc" variants={itemVariants}>
          Play Reversi online — the classic strategic board game also known as Othello.
          Challenge a friend or test your skills against our AI opponent.
          Free, no sign-up, no download required.
        </m.p>

        <m.div className="hero-buttons" variants={itemVariants}>
          <m.button
            className="btn-hero-mode"
            onClick={() => onStartGame('ai')}
            aria-label="Play against AI"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">🤖</span> AI Opponent
          </m.button>

          <m.button
            className="btn-hero-mode"
            onClick={() => onStartGame('2p')}
            aria-label="Play against a friend"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">🎮</span> 2-Player Mode
          </m.button>
        </m.div>

        <m.p className="hero-seo" variants={itemVariants}>
          Reversi (Othello) is a two-player strategy game.
          Players flip opponent pieces to win.
        </m.p>
      </m.div>
    </main>
  );
}
