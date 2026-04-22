import React from 'react';
import { BLACK } from '../utils/gameLogic';

export default function GameControls({
  mode, difficulty, onSetMode, onSetDifficulty,
  onRestart, onUndo, canUndo, theme, onToggleTheme
}) {
  return (
    <div className="game-controls glass-card">
      {/* Mode Toggle */}
      <div className="control-group">
        <label className="control-label">Mode</label>
        <div className="btn-group-custom">
          <button
            className={`ctrl-btn ${mode === '2p' ? 'ctrl-btn--active' : ''}`}
            onClick={() => onSetMode('2p')}
          >
            👥 2 Players
          </button>
          <button
            className={`ctrl-btn ${mode === 'ai' ? 'ctrl-btn--active' : ''}`}
            onClick={() => onSetMode('ai')}
          >
            🤖 vs AI
          </button>
        </div>
      </div>

      {/* Difficulty (only shown in AI mode) */}
      {mode === 'ai' && (
        <div className="control-group">
          <label className="control-label">Difficulty</label>
          <div className="btn-group-custom">
            <button
              className={`ctrl-btn ${difficulty === 'easy' ? 'ctrl-btn--active' : ''}`}
              onClick={() => onSetDifficulty('easy')}
            >
              😊 Easy
            </button>
            <button
              className={`ctrl-btn ${difficulty === 'medium' ? 'ctrl-btn--active' : ''}`}
              onClick={() => onSetDifficulty('medium')}
            >
              🧠 Medium
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="control-group">
        <label className="control-label">Actions</label>
        <div className="btn-group-custom">
          <button className="ctrl-btn ctrl-btn--action" onClick={onRestart} title="New game">
            🔄 Restart
          </button>
          <button
            className={`ctrl-btn ctrl-btn--action ${!canUndo ? 'ctrl-btn--disabled' : ''}`}
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo last move"
          >
            ↩ Undo
          </button>
          <button className="ctrl-btn ctrl-btn--action" onClick={onToggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </div>
  );
}