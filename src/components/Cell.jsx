import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLACK, WHITE } from '../utils/gameLogic';

/**
 * Single cell on the Reversi board.
 * Handles: empty, black disc, white disc, valid-move hint, just-flipped animation.
 */
const Cell = memo(function Cell({ row, col, value, isValid, isLastPlaced, isFlipped, onClick }) {
  const handleClick = () => {
    if (isValid) onClick(row, col);
  };

  return (
    <div
      className={`board-cell ${isValid ? 'valid-move' : ''} ${isLastPlaced ? 'last-placed' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={
        value
          ? `${value} disc at row ${row + 1} col ${col + 1}`
          : isValid
          ? `Valid move at row ${row + 1} col ${col + 1}`
          : `Empty cell at row ${row + 1} col ${col + 1}`
      }
      tabIndex={isValid ? 0 : -1}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      {/* Valid move hint */}
      {isValid && !value && (
        <motion.div
          className="valid-hint"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Disc */}
      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            key={`${row}-${col}-${value}`}
            className={`disc ${value === BLACK ? 'disc-black' : 'disc-white'} ${isFlipped ? 'disc-flipped' : ''} ${isLastPlaced ? 'disc-placed' : ''}`}
            initial={isLastPlaced ? { scale: 0, rotateY: 0 } : isFlipped ? { rotateY: 90 } : { scale: 1 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={
              isLastPlaced
                ? { type: 'spring', stiffness: 500, damping: 25 }
                : isFlipped
                ? { duration: 0.35, ease: 'easeInOut' }
                : { duration: 0 }
            }
          >
            {/* Disc sheen highlight */}
            <div className="disc-sheen" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Cell;