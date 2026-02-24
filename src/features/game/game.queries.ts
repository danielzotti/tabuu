import { useQuery } from '@tanstack/react-query';
import { fetchCards } from './game.api';

export function useCardsQuery() {
    return useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        staleTime: Infinity, // The cards are static, so they never become stale
    });
}
