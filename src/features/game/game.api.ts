import { Card } from './game.models';

export async function fetchCards(): Promise<Card[]> {
    const response = await fetch('/api/cards');
    if (!response.ok) {
        throw new Error('Failed to fetch cards');
    }
    return response.json();
}
