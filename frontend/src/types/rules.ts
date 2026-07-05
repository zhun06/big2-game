// Configurable rules for the game

import type { Card, Rank, Suit } from "@/types/card";
import type { StraightType } from "./combo";

// strength: higher number = stronger. The single source of truth for ordering.
export const RANK_STRENGTH: Record<Rank, number> = {
  "3": 0, "4": 1, "5": 2, "6": 3, "7": 4, "8": 5, "9": 6,
  "10": 7, "J": 8, "Q": 9, "K": 10, "A": 11, "2": 12,
};

// standard Big-2; adjustable
export const SUIT_STRENGTH: Record<Suit, number> = {
  "DIAMONDS": 0, "CLUBS": 1, "HEARTS": 2, "SPADES": 3, 
};

// Rank (3-DIAMONDS < 3-CLUBS < 3-HEARTS < 3-SPADES < 4-DIAMONDS ... < 2-SPADES) => (0 < 1 < 2 < 3 < 4 < 5 ... < 51)
export function cardStrength(card: Card): number {
  return RANK_STRENGTH[card.rank] * 4 + SUIT_STRENGTH[card.suit];
}

// ==== STRAIGHT CONFIGURATION ====
export const ALLOWED_STRAIGHTS: Record<StraightType, boolean> = {
    "NORMAL": true,
    "JQKA2": true,
    "23456": true,
    "WHEEL": true
};

// Straight strength: higher number = stronger
export const STRAIGHT_STRENGTH: Record<StraightType, number> = {
    "NORMAL": 0,
    "JQKA2": 1,
    "23456": 2,
    "WHEEL": 3, // A2345
};


// ==== FLUSH CONFIGURATION ====
export const FLUSH_RULES: Record<string, boolean> = {
    "SUIT_FIRST": true, // if true, flushes are ordered by suit first, then rank; otherwise, by rank first, then suit
}

export const STRAIGTH_FLUSH_RULES: Record<string, boolean> = {
    "SUIT_FIRST": true, // if true, straight flushes are ordered by suit first, then rank; otherwise, by rank first, then suit
}