import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings, X, History } from 'lucide-react';
import { LazyMotion } from 'framer-motion';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';
import PassMessage from './PassMessage';
import { useGame } from '../hooks/useGame';
import { useSound } from '../hooks/useSound';

// Load animation features asynchronously
const loadFeatures = () => import('../utils/framerFeatures.js').then(res => res.default);

// Lazy load non-critical components
const MoveHistory = lazy(() => import('./MoveHistory'));
const GameOverModal = lazy(() => import('./GameOverModal'));

export default function GameController({ theme, onToggleTheme, initialMode }) {
    const game = useGame(initialMode);
    const { playPlace, playFlip, playWin } = useSound();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSetMode = useCallback((newMode) => {
        setSearchParams({ mode: newMode });
    }, [setSearchParams]);

    // Play sounds on events
    useEffect(() => {
        if (game.lastPlaced) {
            playPlace();
            if (game.lastFlipped.length > 0) {
                setTimeout(playFlip, 100);
            }
        }
    }, [game.lastPlaced]);

    useEffect(() => {
        if (game.gameOver) {
            setTimeout(playWin, 200);
        }
    }, [game.gameOver]);

    // Auto-dismiss pass message after 2s
    useEffect(() => {
        if (game.passMessage) {
            const t = setTimeout(game.dismissPass, 2200);
            return () => clearTimeout(t);
        }
    }, [game.passMessage]);

    const {
        board, validMoves, lastFlipped, lastPlaced,
        currentPlayer, gameOver, mode, winner, scores,
        passMessage, dismissPass, moveHistory,
        placeDisc, restart, undo, setDifficulty, history
    } = game;

    const handleCellClick = useCallback((row, col) => {
        if (gameOver) return;
        if (mode === 'ai' && currentPlayer === 'white') return;
        placeDisc(row, col);
    }, [placeDisc, gameOver, mode, currentPlayer]);

    const handleRestart = useCallback(() => {
        restart(mode, game.difficulty);
    }, [restart, mode, game.difficulty]);

    const isAIThinking = mode === 'ai' && currentPlayer === 'white' && !gameOver;

    return (
        <LazyMotion features={loadFeatures} strict>
            <main className="game-controller" id="game-section">
                <PassMessage message={passMessage} onDismiss={dismissPass} />

                <div className="container-fluid">
                    <button
                        className={`btn-toggle-left ${isSettingsOpen ? 'active' : ''}`}
                        onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsHistoryOpen(false); }}
                        aria-label="Toggle Settings"
                    >
                        <Settings size={24} />
                    </button>


                    <button
                        className={`btn-toggle-right ${isHistoryOpen ? 'active' : ''}`}
                        onClick={() => { setIsHistoryOpen(!isHistoryOpen); setIsSettingsOpen(false); }}
                        aria-label="Toggle History"
                    >
                        <History size={24} />
                    </button>

                    <div className="game-layout">

                        {/* Left: Controls + History */}
                        <aside className={`game-sidebar game-sidebar--left ${isSettingsOpen ? 'mobile-show' : 'mobile-hide'}`}>
                            <div className="mobile-drawer-header">
                                <h2 className="drawer-title">Settings</h2>
                                <button className="btn-drawer-close" onClick={() => setIsSettingsOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <GameControls
                                mode={game.mode}
                                difficulty={game.difficulty}
                                onSetMode={handleSetMode}
                                onSetDifficulty={game.setDifficulty}
                                onRestart={handleRestart}
                                onUndo={game.undo}
                                canUndo={game.history.length > 0}
                                theme={theme}
                                onToggleTheme={onToggleTheme}
                            />
                        </aside>

                        {/* Center: Board */}
                        <section className="game-main" aria-label="Game board area">
                            <ScoreBoard
                                scores={scores}
                                currentPlayer={currentPlayer}
                                gameOver={gameOver}
                                winner={winner}
                                mode={mode}
                            />

                            <Board
                                board={board}
                                validMoves={validMoves}
                                lastFlipped={lastFlipped}
                                lastPlaced={lastPlaced}
                                onCellClick={handleCellClick}
                                disabled={gameOver || isAIThinking}
                            />


                            <div className="game-hint" aria-live="polite">
                                {!game.gameOver && !isAIThinking && (
                                    <span>
                                        {game.validMoves.length} valid move{game.validMoves.length !== 1 ? 's' : ''} available
                                    </span>
                                )}

                            </div>
                            {isAIThinking && (
                                <div className="ai-thinking" aria-live="polite">
                                    🤖 AI is thinking...
                                </div>
                            )}
                        </section>

                        {/* Right: Move History */}
                        <aside className={`game-sidebar game-sidebar--right ${isHistoryOpen ? 'mobile-show' : 'mobile-hide'}`}>
                            <div className="mobile-drawer-header">
                                <h2 className="drawer-title">Move History</h2>
                                <button className="btn-drawer-close" onClick={() => setIsHistoryOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            <Suspense fallback={<div className="loading-history">Loading history...</div>}>
                                <MoveHistory moveHistory={game.moveHistory} />
                            </Suspense>
                        </aside>
                    </div>
                </div>

                <Suspense fallback={null}>
                    <GameOverModal
                        gameOver={gameOver}
                        winner={winner}
                        scores={scores}
                        onRestart={handleRestart}
                    />
                </Suspense>
            </main>
        </LazyMotion>
    );
}