import React, { memo, useMemo } from 'react';
import Cell from './Cell';
import { BOARD_SIZE } from '../utils/gameLogic';

/**
 * 8×8 Reversi board.
 * validMoves: array of [row, col]
 * lastFlipped: array of [row, col]
 * lastPlaced: [row, col] or null
 */
const Board = memo(function Board({ board, validMoves, lastFlipped, lastPlaced, onCellClick, disabled }) {
  // Build lookup sets for O(1) checks
  const validSet = useMemo(() => new Set(validMoves.map(([r, c]) => `${r}-${c}`)), [validMoves]);
  const flippedSet = useMemo(() => new Set(lastFlipped.map(([r, c]) => `${r}-${c}`)), [lastFlipped]);

  return (
    <div className="board-wrapper" role="grid" aria-label="Reversi board">
      {/* Column labels A-H */}
      <div className="board-col-labels" aria-hidden="true">
        <div className="board-label-corner" />
        {Array.from({ length: BOARD_SIZE }, (_, i) => (
          <div key={i} className="board-label">{String.fromCharCode(65 + i)}</div>
        ))}
      </div>

      <div className="board-rows">
        {Array.from({ length: BOARD_SIZE }, (_, row) => (
          <div key={row} className="board-row" role="row">
            {/* Row label 1-8 */}
            <div className="board-label" aria-hidden="true">{row + 1}</div>

            {Array.from({ length: BOARD_SIZE }, (_, col) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                value={board[row][col]}
                isValid={!disabled && validSet.has(`${row}-${col}`)}
                isLastPlaced={lastPlaced && lastPlaced[0] === row && lastPlaced[1] === col}
                isFlipped={flippedSet.has(`${row}-${col}`)}
                onClick={onCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Board;