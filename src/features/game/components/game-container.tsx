'use client';

import { Loader2 } from 'lucide-react';
import { useGameState } from '../game.hooks';
import { useCardsQuery } from '../game.queries';
import { EndScreen } from './end-screen';
import { GameBoard } from './game-board';
import { HomeScreen } from './home-screen';

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
        tabuu,
        resetGame,
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
                    onTabuu={() => tabuu(currentCard.id)}
                    onTimeUp={endGame}
                    startTime={state.startTime}
                    accumulatedPausedTime={state.accumulatedPausedTime}
                    isPaused={state.isPaused}
                    lastPauseTime={state.lastPauseTime}
                    timerDuration={state.timerDuration}
                    onPause={pauseGame}
                    onResume={resumeGame}
                    correctCount={state.correctCount}
                    passesCount={state.passesCount}
                    tabuusCount={state.tabuusCount}
                />
            )}
            {state.phase === 'ended' && (
                <EndScreen
                    score={state.score}
                    correctCount={state.correctCount}
                    passesCount={state.passesCount}
                    tabuusCount={state.tabuusCount}
                    onPlayAgain={() => startGame(cards)}
                    onEndGame={resetGame}
                />
            )}
        </div>
    );
}
