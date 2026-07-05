import type { Card, Rank } from "@/types/card";
import type { Sort } from "@/types/sort";
import type { Combo } from "@/types/combo";

import { cardId } from "@/types/card";
import { SORT_TYPES } from "@/types/sort";
import { cardStrength, RANK_STRENGTH, SUIT_STRENGTH } from "@/types/rules"
import { evaluateCombo, isStrongerCombo } from "./combo";
import { getRankCounts } from "./gameUtil";


// Sorts a hand of cards based on the specified sort type
export function sortCards(hand: Card[], sortType: Sort): Card[] {
    switch (sortType) {
        case "BY_RANK":
            return [...hand].sort((a, b) => cardStrength(a) - cardStrength(b));
        case "BY_SUIT":
            // Group by suit (DIAMONDS < CLUBS < HEARTS < SPADES), then by rank within each suit
            return [...hand].sort(
                (a, b) =>
                    SUIT_STRENGTH[a.suit] - SUIT_STRENGTH[b.suit] ||
                    RANK_STRENGTH[a.rank] - RANK_STRENGTH[b.rank]
            );
        case "BY_COMBINATION": {
            // Greedily group the hand into its combos (strongest first) and
            // flatten so each combo's cards sit adjacent. See groupByCombination.
            return groupByCombination(hand).flat();
        }

        default:
            throw new Error(`Unknown sort type: ${sortType}`);
    }
}

// Cycles through the sort types and returns the next sort type
export function nextSort(currentSort: Sort): Sort {
    const currentIndex = SORT_TYPES.indexOf(currentSort);
    const nextIndex = (currentIndex + 1) % SORT_TYPES.length;
    return SORT_TYPES[nextIndex];
}

// ===== Hand decomposition (used by the BY_COMBINATION sort) =====
// Greedily split a hand into the combos it contains, strongest group first:
// 5-card combos (straight flush > four-of-a-kind > full house > flush > straight),
// then triples, then pairs, then leftover singles.
//
// Greedy is a heuristic: when a card belongs to several possible combos this
// won't always find the theoretically-best partition (e.g. a flush can consume
// cards that could instead have formed two pairs). That's fine for a display sort.
export function decomposeHand(hand: Card[]): Combo[] {
    const groups: Combo[] = [];
    let remaining: Card[] = [...hand];

    // 1. Repeatedly extract the strongest available 5-card combo.
    while (remaining.length >= 5) {
        const best = strongestFiveCardCombo(remaining);
        if (!best) break;
        groups.push(best);
        remaining = removeCards(remaining, best.cards);
    }

    // 2. Triples, then 3. pairs — strongest rank first within each tier.
    for (const size of [3, 2] as const) {
        for (const rank of ranksWithCount(remaining, size)) {
            const cards = sortCards(remaining.filter(c => c.rank === rank), "BY_RANK");
            groups.push(evaluateCombo(cards));
            remaining = removeCards(remaining, cards);
        }
    }

    // 4. Leftover singles.
    for (const card of sortCards(remaining, "BY_RANK")) {
        groups.push(evaluateCombo([card]));
    }

    return groups;
}

// Thin wrapper for the UI: the cards of each combo group, in decomposeHand order.
export function groupByCombination(hand: Card[]): Card[][] {
    return decomposeHand(hand).map(combo => combo.cards);
}

// Strongest valid 5-card combo among all 5-card subsets, or null if none exists.
function strongestFiveCardCombo(cards: Card[]): Combo | null {
    let best: Combo | null = null;
    for (const subset of fiveCardSubsets(cards)) {
        const combo = evaluateCombo(subset);
        if (combo.category === "INVALID") continue;
        if (!best || isStrongerCombo(combo, best)) best = combo;
    }
    return best;
}

// All 5-card subsets of `cards`; n <= 13 so at most C(13,5) = 1287 subsets.
function fiveCardSubsets(cards: Card[]): Card[][] {
    const result: Card[][] = [];
    const n = cards.length;
    for (let a = 0; a < n; a++)
        for (let b = a + 1; b < n; b++)
            for (let c = b + 1; c < n; c++)
                for (let d = c + 1; d < n; d++)
                    for (let e = d + 1; e < n; e++)
                        result.push([cards[a], cards[b], cards[c], cards[d], cards[e]]);
    return result;
}

// Ranks appearing exactly `count` times in `cards`, strongest rank first.
function ranksWithCount(cards: Card[], count: number): Rank[] {
    const counts = getRankCounts(cards);
    return (Object.keys(counts) as Rank[])
        .filter(rank => counts[rank] === count)
        .sort((a, b) => RANK_STRENGTH[b] - RANK_STRENGTH[a]);
}

// Remove specific cards (matched by rank+suit id) from a list.
function removeCards(cards: Card[], toRemove: Card[]): Card[] {
    const removeIds = new Set(toRemove.map(cardId));
    return cards.filter(c => !removeIds.has(cardId(c)));
}