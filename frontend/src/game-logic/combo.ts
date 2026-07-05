import type { Card, Rank } from "@/types/card";
import type { ComboCategory, Combo, StraightType } from "@/types/combo";

import { INVALID_COMBO } from "@/types/combo";
import { cardStrength, SUIT_STRENGTH, RANK_STRENGTH, ALLOWED_STRAIGHTS, STRAIGHT_STRENGTH, FLUSH_RULES } from "@/types/rules";
import { getRankCounts } from "./gameUtil";

// Local ascending-by-rank sort. Kept here (instead of importing sortCards) so this
// module stays a leaf: sort.ts depends on combo.ts, not the other way around.
function sortByRank(hand: Card[]): Card[] {
    return [...hand].sort((a, b) => cardStrength(a) - cardStrength(b));
}

// Converts a hand into a combo
export function evaluateCombo(playedCards: Card[]): Combo {
    const handSize: number = playedCards.length;
    const hand: Card[] = sortByRank(playedCards);

    switch(handSize) {
        case 1: {
            return {
                category: "SINGLE", 
                cards: hand,
                size: handSize,
                strength: evaluateSingleStrength(hand),
            }
        }

        case 2: {
            if (!isPair(hand)) return INVALID_COMBO; 
            return {
                category: "PAIR", 
                cards: hand,
                size: handSize,
                strength: evaluatePairStrength(hand),
            }
        }

        case 3: {
            if (!isTriple(hand)) return INVALID_COMBO;
            return {
                category: "TRIPLE", 
                cards: hand,
                size: handSize,
                strength: evaluateTripleStrength(hand),
            }
        }

        case 5: {
            if (!(isStraight(hand) || isFlush(hand) || isFullHouse(hand) || isFourOfAKind(hand))) return INVALID_COMBO;
            return {
                category: evaluateFiveCardCategory(hand), 
                cards: hand,
                size: handSize,
                strength: evaluateFiveCardStrength(hand),
            }
        }

        default: {
            return INVALID_COMBO;
        }

    }

}

// ===== Combo comparison =====
// Category ranking for 5-card combos (higher = stronger)
const FIVE_CARD_CATEGORY_STRENGTH: Partial<Record<ComboCategory, number>> = {
    "STRAIGHT": 0,
    "FLUSH": 1,
    "FULL_HOUSE": 2,
    "FOUR_OF_A_KIND": 3,
    "STRAIGHT_FLUSH": 4,
};

// Returns true if combo a beats combo b. Assumes equal size (only equal
// sizes are comparable). For 5-card combos of different categories the category
// ranking is decisive; otherwise compare strength[] lexicographically.
export function isStrongerCombo(a: Combo, b: Combo): boolean {
    if (a.size === 5 && b.size === 5 && a.category !== b.category) {
        return (FIVE_CARD_CATEGORY_STRENGTH[a.category] ?? -1) > (FIVE_CARD_CATEGORY_STRENGTH[b.category] ?? -1);
    }

    for (let i = 0; i < Math.max(a.strength.length, b.strength.length); i++) {
        const av = a.strength[i] ?? -1;
        const bv = b.strength[i] ?? -1;
        if (av > bv) return true;
        if (av < bv) return false; // a is weaker at this index, stop
    }

    return false; // equal strength => a does not beat b
}

// Single (card strength: 0 - 51)
function evaluateSingleStrength(hand: Card[]): number[] {
    return [cardStrength(hand[0])]
}

// Pair
function isPair(hand: Card[]): boolean {
    return hand[0].rank === hand[1].rank
}
// Use largest of the 2 cards
function evaluatePairStrength(hand: Card[]): number[] {
    return [Math.max(cardStrength(hand[0]), cardStrength(hand[1]))]
}

// Triple
function isTriple(hand: Card[]): boolean {
    return hand[0].rank === hand[1].rank && hand[1].rank === hand[2].rank
}
// Just take any of the 3 cards (unique rank)
function evaluateTripleStrength(hand: Card[]): number[] {
    return [cardStrength(hand[0])]
}

// Five card logic 
// 1. compare combo category 
// 2. compare hand strength (if same combo category)
function evaluateFiveCardCategory(hand: Card[]): ComboCategory {
    // straight flush
    const straightFlush: boolean = isStraightFlush(hand);
    // four of a kind
    const fourOfAKind: boolean = isFourOfAKind(hand);
    // full house
    const fullHouse: boolean = isFullHouse(hand);
    // flush
    const flush: boolean = isFlush(hand);
    // straight
    const straight: boolean = isStraight(hand);


    if (straightFlush) return "STRAIGHT_FLUSH";
    if (fourOfAKind) return "FOUR_OF_A_KIND";
    if (fullHouse) return "FULL_HOUSE";
    if (flush) return "FLUSH";
    if (straight) return "STRAIGHT";

    return "INVALID";
}

// In the case of same combo category, evaluate the strength of the 5-card hand
function evaluateFiveCardStrength(hand: Card[]): number[] {
    switch (evaluateFiveCardCategory(hand)) {
        case "STRAIGHT": {
            const type: StraightType = getStraightType(hand);
            const highCardStrength: number = getStraightHighCardStrength(hand, type);
            return [STRAIGHT_STRENGTH[type], highCardStrength]; // straight type and high card
        }
        case "FLUSH": {
            if (FLUSH_RULES["SUIT_FIRST"]) {
                return [SUIT_STRENGTH[hand[0].suit], Math.max(...hand.map(card => RANK_STRENGTH[card.rank]))]; // suit then strength
            }
            else return [Math.max(...hand.map(card => cardStrength(card)))]; // otherwise card strength
        }
        case "FULL_HOUSE": {
            const counts: Record<Rank, number> = getRankCounts(hand); // get each key value pair of rank: count

            // find the rank of the triple
            let tripleRank: Rank | undefined;
            for (const rank in counts) {
                if (counts[rank as Rank] === 3) {
                    tripleRank = rank as Rank;
                    break;
                }
            }

            return [tripleRank ? cardStrength({ rank: tripleRank, suit: "SPADES" }) : -1] // Use SPADES as a placeholder suit
        }
        case "STRAIGHT_FLUSH": {
            if (FLUSH_RULES["SUIT_FIRST"]) {
                return [SUIT_STRENGTH[hand[0].suit], Math.max(...hand.map(card => RANK_STRENGTH[card.rank]))]; // suit then strength
            }
            else return [Math.max(...hand.map(card => cardStrength(card)))]; // otherwise card strength
        }
        case "FOUR_OF_A_KIND": {
            const counts = getRankCounts(hand); // get each key value pair of rank: count

            // find the rank of the four of a kind
            let fourRank: Rank | undefined;
            for (const rank in counts) {
                if (counts[rank as Rank] === 4) {
                    fourRank = rank as Rank;
                    break;
                }
            }

            return [fourRank ? cardStrength({ rank: fourRank, suit: "SPADES" }) : -1]; // Use SPADES as a placeholder suit
        }
        default:
            return [-1];
    }
}

function isStraight(hand: Card[]): boolean {
    const sortedHand = sortByRank(hand);

    // Check if J-Q-K-A-2 is allowed and present
    const JQKA2: Rank[] = ["J", "Q", "K", "A", "2"];
    if (ALLOWED_STRAIGHTS["JQKA2"] && sortedHand.every((c, i) => c.rank === JQKA2[i])) return true;
    

    // Check A-2-3-4-5 is allowed and present
    const A2345: Rank[] = ["3", "4", "5", "A", "2"]; // sorted
    if (ALLOWED_STRAIGHTS["WHEEL"] && sortedHand.every((c, i) => c.rank === A2345[i])) return true;

    // Check 2-3-4-5-6 is allowed and present
    const two3456: Rank[] = ["3", "4", "5", "6", "2"]; // sorted
    if (!ALLOWED_STRAIGHTS["23456"] && sortedHand.every((c, i) => c.rank === two3456[i])) return true;

    // Check for normal straight (eg. 3-4-5-6-7)
    const normalStraight = sortedHand.every((c, i) => i === 0 || RANK_STRENGTH[sortedHand[i-1].rank] + 1 === RANK_STRENGTH[c.rank]);
    if (normalStraight) return true;

    return false; 
}

// Classify which straight type a (valid) straight hand is
function getStraightType(hand: Card[]): StraightType {
    const sortedHand = sortByRank(hand).map(c => c.rank);
    const matches = (pattern: Rank[]) => sortedHand.every((r, i) => r === pattern[i]);

    if (matches(["J", "Q", "K", "A", "2"])) return "JQKA2";
    if (matches(["3", "4", "5", "A", "2"])) return "WHEEL"; // A-2-3-4-5
    if (matches(["3", "4", "5", "6", "2"])) return "23456";
    return "NORMAL";
}

// Get high card strength of a (valid) straight hand
function getStraightHighCardStrength(hand: Card[], type: StraightType): number {
    const sortedHand: Card[] = sortByRank(hand)
    switch(type) {
        case "NORMAL": return cardStrength(sortedHand[4]); 
        case "JQKA2": return cardStrength(sortedHand[4]); // sorted order: J-Q-K-A-2, high card: 2
        case "23456": return cardStrength(sortedHand[3]); // sorted order: 3-4-5-6-2, high card: 6
        case "WHEEL": return cardStrength(sortedHand[2]);  // sorted order: 3-4-5-A-2, high card: 5
    }
}

function isFlush(hand: Card[]): boolean {
    const firstSuit = hand[0].suit;

    for (const card of hand) {
        if (card.suit !== firstSuit) return false;
    }

    return true;
}

function isFullHouse(hand: Card[]): boolean {
    const counts = getRankCounts(hand);
    let hasThree = false;
    let hasTwo = false;

    for (const rank in counts) {
        if (counts[rank as Rank] === 3) {
            hasThree = true;
        } else if (counts[rank as Rank] === 2) {
            hasTwo = true;
        }
    }

    return hasThree && hasTwo;
}

function isFourOfAKind(hand: Card[]): boolean {
    const counts = getRankCounts(hand);

    for (const rank in counts) {
        if (counts[rank as Rank] === 4) {
            return true;
        }
    }

    return false;
}

function isStraightFlush(hand: Card[]): boolean {
    return isStraight(hand) && isFlush(hand);
}