import React from 'react';
import { motion } from 'framer-motion';
import { BLACK, WHITE } from '../utils/gameLogic';

function PlayerCard({ color, score, isActive, isAI, label, isWinner }) {
    return (
        <div className={`player-card ${isActive ? 'player-card--active' : ''} ${isWinner ? 'player-card--winner' : ''}`}>
            <div className="player-card__inner">
                {/* Disc icon */}
                <div className={`player-disc-icon disc-${color}`}>
                    <div className="disc-sheen" />
                </div>

                <div className="player-info">
                    <div className="player-name">
                        {label}
                        {isAI && <span className="ai-badge">AI</span>}
                    </div>
                    <motion.div
                        className="player-score"
                        key={score}
                        initial={{ scale: 1.4, color: 'var(--accent)' }}
                        animate={{ scale: 1, color: 'var(--text-primary)' }}
                        transition={{ duration: 0.35 }}
                    >
                        {score}
                    </motion.div>
                </div>

                {/* Active turn pulse */}
                {isActive && (
                    <motion.div
                        className="turn-pulse"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                    />
                )}
            </div>
        </div>
    );
}

export default function ScoreBoard({ scores, currentPlayer, gameOver, winner, mode }) {
    return (
        <div className="scoreboard">
            <PlayerCard
                color="black"
                label="Black"
                score={scores.black}
                isActive={!gameOver && currentPlayer === BLACK}
                isAI={false}
                isWinner={gameOver && winner === BLACK}
            />

            <div className="scoreboard__center">
                {gameOver ? (
                    <div className="vs-text game-over-text">
                        {winner === 'draw' ? '🤝 Draw!' : winner === BLACK ? '⚫ Black Wins!' : '⚪ White Wins!'}
                    </div>
                ) : (
                    <>
                        <div className="vs-text">VS</div>
                        <div className="turn-text">
                            {currentPlayer === BLACK ? '⚫' : '⚪'} Turn
                        </div>
                    </>
                )}
            </div>

            <PlayerCard
                color="white"
                label="White"
                score={scores.white}
                isActive={!gameOver && currentPlayer === WHITE}
                isAI={mode === 'ai'}
                isWinner={gameOver && winner === WHITE}
            />
        </div>
    );
}