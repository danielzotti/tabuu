'use client';

import { useCardsQuery } from '../game.queries';
import { GamePhase, Card } from '../game.models';
import { useState, useCallback } from 'react';
import { HomeScreen } from './home-screen';
import { GameBoard } from './game-board';
import { EndScreen } from './end-screen';
import { Loader2 } from 'lucide-react';

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export function GameContainer() {
    const { data: cards, isLoading, isError } = useCardsQuery();
    const [phase, setPhase] = useState<GamePhase>('idle');
    const [score, setScore] = useState(0);
    const [deck, setDeck] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const startGame = useCallback(() => {
        if (!cards) return;
        setDeck(shuffle(cards));
        setCurrentIndex(0);
        setScore(0);
        setPhase('playing');
    }, [cards]);

    const endGame = useCallback(() => {
        setPhase('ended');
    }, []);

    const handleCorrect = useCallback(() => {
        setScore((s) => s + 1);
        setCurrentIndex((i) => i + 1);
    }, []);

    const handlePass = useCallback(() => {
        // Standard rule: 0 points for pass, just skip
        setCurrentIndex((i) => i + 1);
    }, []);

    const handleTaboo = useCallback(() => {
        setScore((s) => s - 1);
        setCurrentIndex((i) => i + 1);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-fuchsia-500" />
            </div>
        );
    }

    if (isError || !cards) {
        return (
            <div className="text-center text-red-500">
                <p>Errore nel caricamento delle carte.</p>
            </div>
        );
    }

    const currentCard = deck[currentIndex];

    return (
        <div className="w-full">
            {phase === 'idle' && <HomeScreen onStart={startGame} />}
            {phase === 'playing' && currentCard && (
                <GameBoard
                    card={currentCard}
                    onCorrect={handleCorrect}
                    onPass={handlePass}
                    onTaboo={handleTaboo}
                    onTimeUp={endGame}
                />
            )}
            {phase === 'ended' && <EndScreen score={score} onPlayAgain={startGame} />}
        </div>
    );
}
