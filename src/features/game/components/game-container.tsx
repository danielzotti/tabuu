'use client';

import { useCardsQuery } from '../game.queries';
import { HomeScreen } from './home-screen';
import { GameBoard } from './game-board';
import { EndScreen } from './end-screen';
import { Loader2 } from 'lucide-react';
import { useGameState } from '../game.hooks';

export function GameContainer() {
    const { data: cards, isLoading: isCardsLoading, isError } = useCardsQuery();

    const {
        isHydrated,
        state,
        startGame,
        pauseGame,
        resumeGame,
        endGame,
        correct,
        pass,
        taboo,
    } = useGameState();

    if (isCardsLoading || !isHydrated) {
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

    const currentCard = state.deck[state.currentIndex];

    // If we run out of cards while playing, end game automatically
    if (state.phase === 'playing' && !currentCard) {
        setTimeout(() => endGame(), 0);
    }

    return (
        <div className="w-full">
            {state.phase === 'idle' && <HomeScreen onStart={() => startGame(cards)} />}
            {state.phase === 'playing' && currentCard && (
                <GameBoard
                    card={currentCard}
                    onCorrect={() => correct(currentCard.id)}
                    onPass={() => pass(currentCard.id)}
                    onTaboo={() => taboo(currentCard.id)}
                    onTimeUp={endGame}
                    startTime={state.startTime}
                    accumulatedPausedTime={state.accumulatedPausedTime}
                    isPaused={state.isPaused}
                    lastPauseTime={state.lastPauseTime}
                    timerDuration={state.timerDuration}
                    onPause={pauseGame}
                    onResume={resumeGame}
                />
            )}
            {state.phase === 'ended' && (
                <EndScreen
                    score={state.score}
                    passesCount={state.passesCount}
                    taboosCount={state.taboosCount}
                    onPlayAgain={() => startGame(cards)}
                />
            )}
        </div>
    );
}
