import { useState, useEffect, useCallback } from 'react';
import { GamePhase, Card } from './game.models';

const STORAGE_KEY = 'tabuu_game_state';

export interface GameState {
    phase: GamePhase;
    score: number;
    correctCount: number;
    passesCount: number;
    tabuusCount: number;
    seenCardIds: number[];
    deck: Card[];
    currentIndex: number;

    // Timer state
    startTime: number | null;
    accumulatedPausedTime: number;
    isPaused: boolean;
    lastPauseTime: number | null;
    timerDuration: number;
}

const initialState: GameState = {
    phase: 'idle',
    score: 0,
    correctCount: 0,
    passesCount: 0,
    tabuusCount: 0,
    seenCardIds: [],
    deck: [],
    currentIndex: 0,

    startTime: null,
    accumulatedPausedTime: 0,
    isPaused: false,
    lastPauseTime: null,
    timerDuration: 60000, // 60 seconds
};

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export function useGameState() {
    const [state, setState] = useState<GameState>(initialState);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const saved = globalThis.localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setState((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error('Failed to parse game state', e);
            }
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state, isHydrated]);

    const startGame = useCallback((allCards: Card[]) => {
        setState((prev) => {
            // Filter out cards we've already seen
            const availableCards = allCards.filter(c => !prev.seenCardIds.includes(c.id));

            // If we run out of cards, reset seen cards and use all
            const cardsToUse = availableCards.length > 0 ? availableCards : allCards;

            const shuffledDeck = shuffle(cardsToUse);

            return {
                ...initialState,
                // keep the previously seen cards except if we reset
                seenCardIds: availableCards.length > 0 ? prev.seenCardIds : [],

                deck: shuffledDeck,
                currentIndex: 0,
                phase: 'playing',

                startTime: Date.now(),
            };
        });
    }, []);

    const pauseGame = useCallback(() => {
        setState((prev) => {
            if (prev.isPaused || prev.phase !== 'playing') return prev;
            return {
                ...prev,
                isPaused: true,
                lastPauseTime: Date.now(),
            };
        });
    }, []);

    const resumeGame = useCallback(() => {
        setState((prev) => {
            if (!prev.isPaused || prev.phase !== 'playing' || !prev.lastPauseTime) return prev;
            const pauseDuration = Date.now() - prev.lastPauseTime;
            return {
                ...prev,
                isPaused: false,
                lastPauseTime: null,
                accumulatedPausedTime: prev.accumulatedPausedTime + pauseDuration,
            };
        });
    }, []);

    const endGame = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: 'ended',
            isPaused: false,
        }));
    }, []);

    const correct = useCallback((cardId: number) => {
        setState((prev) => ({
            ...prev,
            score: prev.score + 1,
            correctCount: prev.correctCount + 1,
            seenCardIds: Array.from(new Set([...prev.seenCardIds, cardId])),
            currentIndex: prev.currentIndex + 1,
        }));
    }, []);

    const pass = useCallback((cardId: number) => {
        setState((prev) => ({
            ...prev,
            passesCount: prev.passesCount + 1,
            seenCardIds: Array.from(new Set([...prev.seenCardIds, cardId])),
            currentIndex: prev.currentIndex + 1,
        }));
    }, []);

    const tabuu = useCallback((cardId: number) => {
        setState((prev) => ({
            ...prev,
            score: prev.score - 1,
            tabuusCount: prev.tabuusCount + 1,
            seenCardIds: Array.from(new Set([...prev.seenCardIds, cardId])),
            currentIndex: prev.currentIndex + 1,
        }));
    }, []);

    return {
        isHydrated,
        state,
        startGame,
        pauseGame,
        resumeGame,
        endGame,
        correct,
        pass,
        tabuu,
    };
}
