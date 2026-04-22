import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLACK } from '../utils/gameLogic';

function colLabel(c) { return String.fromCharCode(65 + c); }

const getMoveCommentary = (move) => {
    if (move.flipped >= 6) return "💥 Crushing blow!";
    if (move.flipped >= 4) return "⚔️ Massive strike";
    if ((move.row === 0 || move.row === 7) && (move.col === 0 || move.col === 7)) return "👑 Corner dominance!";
    if (move.row === 0 || move.row === 7 || move.col === 0 || move.col === 7) return "🛡️ Edge control";
    return "♟️ Strategic move";
};

export default function MoveHistory({ moveHistory }) {
    const bottomRef = useRef(null);

    // Auto-scroll to bottom using scrollIntoView on a dummy element
    // This avoids querying scrollHeight and prevents "Forced Reflow"
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [moveHistory]);

    return (
        <div className="move-history glass-card">
            <h3 className="panel-title">📜 Strategic Timeline</h3>
            {moveHistory.length === 0 ? (
                <p className="no-moves">Matches start with silence...</p>
            ) : (
                <div className="move-list timeline-view">
                    <AnimatePresence initial={false}>
                        {moveHistory.map((move, i) => (
                            <motion.div
                                key={`${i}-${move.player}-${move.row}-${move.col}`}
                                className={`timeline-node ${move.player === BLACK ? 'node-black' : 'node-white'}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="node-marker">
                                    <span className={`disc-tiny disc-${move.player}`} />
                                    <div className="node-line" />
                                </div>
                                <div className="node-content">
                                    <div className="node-header">
                                        <span className="node-num">#{i + 1} at {colLabel(move.col)}{move.row + 1}</span>
                                        <span className="node-comment">{getMoveCommentary(move)}</span>
                                    </div>
                                    <div className="node-stats">
                                        <span className="stat-caps">Captures: <span className="highlight">+{move.flipped}</span></span>
                                        <span className="stat-score">{move.scoreAfter.black} : {move.scoreAfter.white}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {/* Dummy element for auto-scrolling */}
                    <div ref={bottomRef} style={{ height: 1, marginTop: -1 }} />
                </div>
            )}
        </div>
    );
}