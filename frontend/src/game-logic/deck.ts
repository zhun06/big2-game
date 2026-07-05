import type { Card } from "@/types/card";
import { SUITS, RANKS } from "@/types/card";


export function createDeck(): Card[] {
    const deck: Card[] = [];

    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({ suit, rank });
        }
    }

    return deck;
}

export function shuffleDeck(deck : Card[]): Card[] {
    const shuffled_deck: Card[] = [...deck]
    
    for (let i = shuffled_deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = shuffled_deck[i];
        shuffled_deck[i] = shuffled_deck[j];
        shuffled_deck[j] = temp;
    }

    return shuffled_deck; 
}

export function dealCards(deck: Card[], players: number, cardsPerPlayer: number)
: { hands: Card[][]; remainingDeck: Card[] } {
    if (deck.length < players * cardsPerPlayer) {
        throw new Error(`dealCards: need ${players * cardsPerPlayer} cards, deck has ${deck.length}`);
    }

    const hands: Card[][] = Array.from({ length: players }, () => []);

    let deckIndex = 0;

    for (let i = 0; i < cardsPerPlayer; i++) {
        for (let p = 0; p < players; p++) {
        hands[p].push(deck[deckIndex]);
        deckIndex++;
        }
    }

    const remainingDeck = deck.slice(deckIndex);

    return { hands, remainingDeck };
}

export function printCards(cards : Card[]) : void {
    console.log(cards)
}