// Helper functions

import type { Card } from "@/types/card";
import type { Rank } from "@/types/card";

// Count the occurrences of each rank in the hand
export function getRankCounts(hand: Card[]) {
    const counts: Record<Rank, number> = {} as any;

    for (const card of hand) {
        counts[card.rank] = (counts[card.rank] || 0) + 1;
    }

    return counts;
}