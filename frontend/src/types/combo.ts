import type { Card } from "./card";

export type ComboCategory = 
  | "SINGLE" | "PAIR" | "TRIPLE"
  | "STRAIGHT" | "FLUSH" | "FULL_HOUSE"
  | "FOUR_OF_A_KIND" | "STRAIGHT_FLUSH"
  | "INVALID" | "EMPTY";

export type Combo = {
  category: ComboCategory;
  cards: Card[];     // the original cards
  size: number;      // 1 | 2 | 3 | 5 — only equal sizes can be compared
  strength: number[];  // compare combos of the SAME size, compare index 0, if(same) compare index 1, etc...
};

// Use this when there is an invalid combo
export const INVALID_COMBO: Combo = {
    category: "INVALID", 
    cards: [],
    size: 0,
    strength: [-1],
}

// Use this to initialize empty table
export const EMPTY_COMBO: Combo = {
    category: "EMPTY", 
    cards: [],
    size: 0,
    strength: [-1], // Strength are compared Lexicographically, eg index 0, if equal compare index 1.. etc
}

// WHEEL <=> A-2-3-4-5
export const STRAIGHT_TYPES = ["NORMAL", "JQKA2", "23456", "WHEEL"] as const;

export type StraightType = typeof STRAIGHT_TYPES[number];