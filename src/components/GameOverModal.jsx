import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLACK } from '../utils/gameLogic';

const confettiVariants = {
    animate: (i) => ({
        y: [0, 800],
        x: [0, (i % 2 === 0 ? 100 : -100) * Math.random()],
        rotate: [0, 360],
        opacity: [1, 0],
        transition: {
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut"
        }
    })
};

const Confetti = () => (
    <div className="confetti-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(24)].map((_, i) => (
            <motion.div
                key={i}
                custom={i}
                variants={confettiColors[i % confettiColors.length]}
                className="confetti-piece"
                style={{
                    position: 'absolute',
                    top: -20,
                    left: `${(i / 24) * 100}%`,
                    width: 8,
                    height: 8,
                    backgroundColor: confettiColors[i % confettiColors.length],
                    borderRadius: i % 3 === 0 ? '50%' : '2px',
                }}
                animate="animate"
            />
        ))}
    </div>
);

const confettiColors = ['#aa3bff', '#d4af37', '#ffffff', '#444444'];

export default function GameOverModal({ gameOver, winner, scores, onRestart }) {
    const isDraw = winner === 'draw';

    return (
        <AnimatePresence>
            {gameOver && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {winner !== 'draw' && <Confetti />}

                    <motion.div
                        className="modal-card glass-card"
                        initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        <motion.div
                            className="modal-emoji"
                            initial={{ y: -20, scale: 0 }}
                            animate={{ y: 0, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                        >
                            {isDraw ? '🤝' : winner === BLACK ? '🏆' : '👑'}
                        </motion.div>

                        <motion.h2
                            className="modal-title"
                            initial={{ filter: 'blur(10px)', opacity: 0 }}
                            animate={{ filter: 'blur(0px)', opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {isDraw ? "It's a Draw!" : `${winner === BLACK ? 'Black' : 'White'} Wins!`}
                        </motion.h2>

                        <motion.p
                            className="modal-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.9 }}
                        >
                            Final Result
                        </motion.p>

                        <div className="modal-scores">
                            <motion.div
                                className="modal-score-item"
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            >
                                <div className="player-disc-icon disc-black"><div className="disc-sheen" /></div>
                                <span className="modal-score-num">{scores.black}</span>
                            </motion.div>

                            <div className="modal-divider">vs</div>

                            <motion.div
                                className="modal-score-item"
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            >
                                <div className="player-disc-icon disc-white"><div className="disc-sheen" /></div>
                                <span className="modal-score-num">{scores.white}</span>
                            </motion.div>
                        </div>

                        {/* Winner Bar: Using scaleX to avoid Forced Reflow (composited animation) */}
                        <motion.div
                            className="modal-winner-bar"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            style={{ transformOrigin: 'left' }}
                            transition={{ delay: 1.3, duration: 0.8 }}
                        >
                            <div
                                className="modal-winner-fill modal-winner-black"
                                style={{ width: `${(scores.black / (scores.black + scores.white)) * 100}%` }}
                            />
                            <div
                                className="modal-winner-fill modal-winner-white"
                                style={{ width: `${(scores.white / (scores.black + scores.white)) * 100}%` }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.6 }}
                        >
                            <button className="btn-play-again" onClick={onRestart}>
                                Play Again
                            </button>
                        </motion.div>

                        <div className="modal-shine" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
