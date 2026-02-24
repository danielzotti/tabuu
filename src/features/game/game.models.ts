export interface Card {
    id: number;
    word: string;
    forbiddenWords: string[];
}

export type GamePhase = 'idle' | 'playing' | 'ended';
