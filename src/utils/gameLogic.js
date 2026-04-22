// ============================================================
// Reversi / Othello Core Game Logic
// ============================================================

export const EMPTY = null;
export const BLACK = 'black';
export const WHITE = 'white';
export const BOARD_SIZE = 8;

// All 8 directions: [row, col]
export const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

/** Create initial 8x8 board with 4 center pieces */
export function createInitialBoard() {
    const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));
    const mid = BOARD_SIZE / 2;
    board[mid - 1][mid - 1] = WHITE;
    board[mid - 1][mid] = BLACK;
    board[mid][mid - 1] = BLACK;
    board[mid][mid] = WHITE;
    return board;
}

/** Check if (r, c) is within board bounds */
export function inBounds(r, c) {
    return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

/**
 * Returns list of opponent pieces that would be flipped
 * if `player` places at (row, col).
 * Returns [] if the move is invalid.
 */
export function getFlippable(board, row, col, player) {
    if (board[row][col] !== EMPTY) return [];
    const opponent = player === BLACK ? WHITE : BLACK;
    const toFlip = [];

    for (const [dr, dc] of DIRECTIONS) {
        const line = [];
        let r = row + dr;
        let c = col + dc;

        while (inBounds(r, c) && board[r][c] === opponent) {
            line.push([r, c]);
            r += dr;
            c += dc;
        }

        // Valid only if the line ends with a player piece
        if (line.length > 0 && inBounds(r, c) && board[r][c] === player) {
            toFlip.push(...line);
        }
    }

    return toFlip;
}

/** Returns all valid moves for `player` as array of [row, col] */
export function getValidMoves(board, player) {
    const moves = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === EMPTY && getFlippable(board, r, c, player).length > 0) {
                moves.push([r, c]);
            }
        }
    }
    return moves;
}

/** Apply a move: place piece and flip opponent pieces. Returns new board. */
export function applyMove(board, row, col, player) {
    const newBoard = board.map(r => [...r]);
    const flippable = getFlippable(newBoard, row, col, player);
    if (flippable.length === 0) return null; // invalid

    newBoard[row][col] = player;
    for (const [r, c] of flippable) {
        newBoard[r][c] = player;
    }
    return { board: newBoard, flipped: flippable };
}

/** Count pieces for each player */
export function countPieces(board) {
    let black = 0, white = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === BLACK) black++;
            else if (board[r][c] === WHITE) white++;
        }
    }
    return { black, white };
}

/** Check if the game is over */
export function isGameOver(board) {
    const blackMoves = getValidMoves(board, BLACK);
    const whiteMoves = getValidMoves(board, WHITE);
    return blackMoves.length === 0 && whiteMoves.length === 0;
}

/** Determine winner. Returns BLACK, WHITE, or 'draw' */
export function getWinner(board) {
    const { black, white } = countPieces(board);
    if (black > white) return BLACK;
    if (white > black) return WHITE;
    return 'draw';
}

// ============================================================
// AI Logic
// ============================================================

/** Positional weight table for smarter heuristic */
const WEIGHT_TABLE = [
    [100, -20, 10, 5, 5, 10, -20, 100],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [10, -2, 4, 2, 2, 4, -2, 10],
    [5, -2, 2, 1, 1, 2, -2, 5],
    [5, -2, 2, 1, 1, 2, -2, 5],
    [10, -2, 4, 2, 2, 4, -2, 10],
    [-20, -50, -2, -2, -2, -2, -50, -20],
    [100, -20, 10, 5, 5, 10, -20, 100],
];

/** Score a board position from `player`'s perspective */
function scoreBoard(board, player) {
    const opponent = player === BLACK ? WHITE : BLACK;
    let score = 0;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === player) score += WEIGHT_TABLE[r][c];
            else if (board[r][c] === opponent) score -= WEIGHT_TABLE[r][c];
        }
    }
    return score;
}

/** Minimax with alpha-beta pruning */
function minimax(board, depth, alpha, beta, maximizing, aiPlayer, opponentPlayer) {
    if (depth === 0 || isGameOver(board)) {
        return scoreBoard(board, aiPlayer);
    }

    const currentPlayer = maximizing ? aiPlayer : opponentPlayer;
    const moves = getValidMoves(board, currentPlayer);

    if (moves.length === 0) {
        // Pass turn
        return minimax(board, depth - 1, alpha, beta, !maximizing, aiPlayer, opponentPlayer);
    }

    if (maximizing) {
        let maxEval = -Infinity;
        for (const [r, c] of moves) {
            const result = applyMove(board, r, c, currentPlayer);
            const evalScore = minimax(result.board, depth - 1, alpha, beta, false, aiPlayer, opponentPlayer);
            maxEval = Math.max(maxEval, evalScore);
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const [r, c] of moves) {
            const result = applyMove(board, r, c, currentPlayer);
            const evalScore = minimax(result.board, depth - 1, alpha, beta, true, aiPlayer, opponentPlayer);
            minEval = Math.min(minEval, evalScore);
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

/** Get AI move for `player` at given difficulty */
export function getAIMove(board, player, difficulty = 'easy') {
    const opponent = player === BLACK ? WHITE : BLACK;
    const moves = getValidMoves(board, player);
    if (moves.length === 0) return null;

    if (difficulty === 'easy') {
        // Random move
        return moves[Math.floor(Math.random() * moves.length)];
    }

    // Medium: minimax depth 3
    let bestScore = -Infinity;
    let bestMove = moves[0];

    for (const [r, c] of moves) {
        const result = applyMove(board, r, c, player);
        const score = minimax(result.board, 3, -Infinity, Infinity, false, player, opponent);
        if (score > bestScore) {
            bestScore = score;
            bestMove = [r, c];
        }
    }

    return bestMove;
}