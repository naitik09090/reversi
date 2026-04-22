import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }
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
    <section className="hero-section" aria-label="Game introduction">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hero-discs" 
          aria-hidden="true"
          variants={discVariants}
          animate="animate"
        >
          <div className="hero-disc disc-black"><div className="disc-sheen"/></div>
          <div className="hero-disc disc-white"><div className="disc-sheen"/></div>
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="hero-title-main">Reversi</span>
          <span className="hero-title-sub">Classic Othello Board Game</span>
        </motion.h1>

        <motion.p className="hero-desc" variants={itemVariants}>
          Play Reversi online — the classic strategic board game also known as Othello.
          Challenge a friend or test your skills against our AI opponent.
          Free, no sign-up, no download required.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.button 
            className="btn-hero-mode" 
            onClick={() => onStartGame('ai')} 
            aria-label="Play against AI"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">🤖</span> AI Opponent
          </motion.button>

          <motion.button 
            className="btn-hero-mode" 
            onClick={() => onStartGame('2p')} 
            aria-label="Play against a friend"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">🎮</span> 2-Player Mode
          </motion.button>
        </motion.div>

        <motion.p className="hero-seo" variants={itemVariants}>
          Reversi (Othello) is a two-player strategy game.
          Players flip opponent pieces to win.
        </motion.p>
      </motion.div>
    </section>
  );
}