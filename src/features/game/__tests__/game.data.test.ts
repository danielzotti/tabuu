import { describe, it, expect } from 'vitest';
import cards from '../../../data/cards.json';

describe('Game Data Layer', () => {
    it('should have exactly 100 cards', () => {
        expect(cards).toHaveLength(100);
    });

    it('each card should have a word and exactly 5 forbidden words', () => {
        cards.forEach(card => {
            expect(card).toHaveProperty('id');
            expect(card).toHaveProperty('word');
            expect(typeof card.word).toBe('string');
            expect(card).toHaveProperty('forbiddenWords');
            expect(Array.isArray(card.forbiddenWords)).toBe(true);
            expect(card.forbiddenWords).toHaveLength(5);
        });
    });

    it('cards should have unique words', () => {
        const words = new Set(cards.map(c => c.word));
        expect(words.size).toBe(100);
    });
});
