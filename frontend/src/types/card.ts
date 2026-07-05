// Define a poker card

export const SUITS = ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"] as const;
export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

export type Suit = typeof SUITS[number];
export type Rank = typeof RANKS[number];

export type Card = {
  suit: Suit;
  rank: Rank;
};

// Returns a unique identifier for a card, e.g., "A-SPADES"
export function cardId(card: Card) {
    return `${card.rank}-${card.suit}`;
}