import { useReducer, useCallback, useEffect, useRef } from 'react';
import {
    createInitialBoard, getValidMoves, applyMove,
    countPieces, isGameOver, getWinner, getAIMove,
    BLACK, WHITE
} from '../utils/gameLogic';

// ── Action Types ──────────────────────────────────────────────
const PLACE_DISC = 'PLACE_DISC';
const RESTART = 'RESTART';
const UNDO = 'UNDO';
const SET_MODE = 'SET_MODE';
const SET_DIFF = 'SET_DIFF';
const PASS_TURN = 'PASS_TURN';

// ── Initial State ─────────────────────────────────────────────
function buildInitialState(mode = '2p', difficulty = 'easy') {
    const board = createInitialBoard();
    const validMoves = getValidMoves(board, BLACK);
    return {
        board,
        currentPlayer: BLACK,
        validMoves,
        history: [],             // array of { board, currentPlayer, scores }
        scores: countPieces(board),
        gameOver: false,
        winner: null,
        passMessage: null,
        mode,                    // '2p' | 'ai'
        difficulty,              // 'easy' | 'medium'
        moveHistory: [],         // [{player, row, col, scoreAfter}]
        lastFlipped: [],         // cells flipped in last move (for animation)
        lastPlaced: null,        // last placed cell
    };
}

// ── Reducer ───────────────────────────────────────────────────
function gameReducer(state, action) {
    switch (action.type) {

        case PLACE_DISC: {
            const { row, col } = action;
            const result = applyMove(state.board, row, col, state.currentPlayer);
            if (!result) return state;

            const newBoard = result.board;
            const newScores = countPieces(newBoard);
            const nextPlayer = state.currentPlayer === BLACK ? WHITE : BLACK;
            let nextValid = getValidMoves(newBoard, nextPlayer);
            let passMsg = null;
            let finalPlayer = nextPlayer;

            // If next player has no moves, try the current player
            if (nextValid.length === 0) {
                const backValid = getValidMoves(newBoard, state.currentPlayer);
                if (backValid.length > 0) {
                    passMsg = `${nextPlayer === BLACK ? 'Black' : 'White'} has no moves — turn passed!`;
                    finalPlayer = state.currentPlayer;
                    nextValid = backValid;
                }
            }

            const over = isGameOver(newBoard);
            const winner = over ? getWinner(newBoard) : null;

            const moveRecord = {
                player: state.currentPlayer,
                row,
                col,
                scoreAfter: newScores,
                flipped: result.flipped.length,
            };

            return {
                ...state,
                board: newBoard,
                currentPlayer: finalPlayer,
                validMoves: nextValid,
                history: [...state.history, {
                    board: state.board,
                    currentPlayer: state.currentPlayer,
                    scores: state.scores,
                    moveHistory: state.moveHistory,
                }],
                scores: newScores,
                gameOver: over,
                winner,
                passMessage: passMsg,
                moveHistory: [...state.moveHistory, moveRecord],
                lastFlipped: result.flipped,
                lastPlaced: [row, col],
            };
        }

        case PASS_TURN: {
            return { ...state, passMessage: null };
        }

        case UNDO: {
            if (state.history.length === 0) return state;
            const prev = state.history[state.history.length - 1];
            return {
                ...state,
                board: prev.board,
                currentPlayer: prev.currentPlayer,
                validMoves: getValidMoves(prev.board, prev.currentPlayer),
                scores: prev.scores,
                history: state.history.slice(0, -1),
                gameOver: false,
                winner: null,
                passMessage: null,
                moveHistory: prev.moveHistory,
                lastFlipped: [],
                lastPlaced: null,
            };
        }

        case RESTART: {
            return buildInitialState(action.mode ?? state.mode, action.difficulty ?? state.difficulty);
        }

        case SET_MODE: {
            return buildInitialState(action.mode, state.difficulty);
        }

        case SET_DIFF: {
            return { ...state, difficulty: action.difficulty };
        }

        default:
            return state;
    }
}

// ── Hook ──────────────────────────────────────────────────────
export function useGame(initialMode = '2p') {
    const [state, dispatch] = useReducer(gameReducer, buildInitialState(initialMode));
    const aiTimer = useRef(null);

    // AI turn trigger
    useEffect(() => {
        const { mode, difficulty, currentPlayer, gameOver, board, passMessage } = state;
        if (mode !== 'ai' || gameOver || currentPlayer !== WHITE || passMessage) return;

        aiTimer.current = setTimeout(() => {
            const move = getAIMove(board, WHITE, difficulty);
            if (move) {
                dispatch({ type: PLACE_DISC, row: move[0], col: move[1] });
            }
        }, 500);

        return () => clearTimeout(aiTimer.current);
    }, [state]);

    const placeDisc = useCallback((row, col) => {
        dispatch({ type: PLACE_DISC, row, col });
    }, []);

    const restart = useCallback((mode, difficulty) => {
        dispatch({ type: RESTART, mode, difficulty });
    }, []);

    const undo = useCallback(() => {
        // In AI mode, undo two moves so it's human's turn again
        dispatch({ type: UNDO });
        if (state.mode === 'ai') dispatch({ type: UNDO });
    }, [state.mode]);

    const setMode = useCallback((mode) => {
        dispatch({ type: SET_MODE, mode });
    }, []);

    const setDifficulty = useCallback((difficulty) => {
        dispatch({ type: SET_DIFF, difficulty });
    }, []);

    const dismissPass = useCallback(() => {
        dispatch({ type: PASS_TURN });
    }, []);

    return {
        ...state,
        placeDisc,
        restart,
        undo,
        setMode,
        setDifficulty,
        dismissPass,
    };
}