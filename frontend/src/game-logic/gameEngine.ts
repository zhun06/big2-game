// Game engine: manages game states
// A React Reducer function

import type { GameState } from "@/types/gameState";
import type { GameAction } from "@/types/gameAction";
import type { Player } from "@/types/player";
import type { Card } from "@/types/card";

import { cardId } from "@/types/card";
import { EMPTY_COMBO } from "@/types/combo";
import { createDeck, shuffleDeck, dealCards } from "./deck";
import { createPlayer, createBot, setPlayerHand, resetPlayer } from "./player";
import { sortCards, nextSort } from "./sort";
import { isValidMove } from "./rules";
import { setResults, settleBets } from "./result"; 
import { evaluateCombo } from "./combo"


export function GameEngine(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "INIT_GAME": {
            // Fresh shuffled deck 
            const deck: Card[] = shuffleDeck(createDeck());
            const bet: number = 100;

            // On second game onwards
            if (state.status === "FINISHED") {
                console.log("Second game onwards");
                const winner = state.players.find(p => p.result === "win");
                if (winner) console.log("there is a winner");
                if (!winner) throw new Error("Game finished without a winner");
                console.log(winner)
                console.log(state.players);

                return { ...state, status: "PLAYING", deck: deck, table: EMPTY_COMBO, bet: bet, previousPlayer: null, currentPlayer: winner, sortType: "BY_RANK" };  // winner goes first
            }

            // On first game, create 4 players
            const players: Player[] = [
                createPlayer("Zhun"),
                createBot("John"), 
                createBot("Iris"),
                createBot("Carlos"),
            ];

            return { status: "PLAYING", deck: deck, table: EMPTY_COMBO, players: players, bet: bet, previousPlayer: null, currentPlayer: players[0], sortType: "BY_RANK" };  // human player goes first
        }
    
        case "DEAL_CARDS": {
            const { hands, remainingDeck } = dealCards(state.deck, 4, 13);
            const players: Player[] = state.players.map((p, i) => setPlayerHand(p, hands[i]));
            const sortedPlayers: Player[] = players.map(player => ({ ...player, hand: sortCards(player.hand, state.sortType) }));

            // Re-point currentPlayer to the new objects (same identity),
            const currentPlayer = sortedPlayers.find(p => p.id === state.currentPlayer?.id) ?? null;

            return { ...state, players: sortedPlayers, currentPlayer: currentPlayer, deck: remainingDeck, previousPlayer: null };  
        }

        case "SORT_CARDS": {
            const sortType = nextSort(state.sortType);


            const sortedPlayers: Player[] = state.players.map(player => {
                const sortedHand = sortCards(player.hand, sortType);
                return { ...player, hand: sortedHand };
            });

            // Re-point currentPlayer/previousPlayer to the new objects (same identity),
            const currentPlayer = sortedPlayers.find(p => p.id === state.currentPlayer?.id) ?? null;
            const previousPlayer = sortedPlayers.find(p => p.id === state.previousPlayer?.id) ?? null;

            return { ...state, players: sortedPlayers, sortType, currentPlayer, previousPlayer };
        }

        case "PLAY_CARDS": {
            const playedCards: Card[] = action.cards;
            
            if (!isValidMove(state.table, playedCards)) return state;

            // New player objects, new hands
            const players: Player[] = state.players.map((player) => {
                const newHand = player.hand.filter(c => !playedCards.some(p => cardId(p) === cardId(c)));
                return { ...player, hand: newHand };            
            });

            // Re-point currentPlayer to the new object (same identity),
            const currentPlayer = players.find(p => p.id === state.currentPlayer?.id) ?? null;
            if (!currentPlayer ) throw new Error("Lost track of current player");

            // Check for winner
            if (currentPlayer.hand.length === 0) {
                console.log("winner found!!!");
                const isSetResults: Player[] = setResults(players);
                const isSettleBets: Player[] = settleBets(isSetResults, state.bet);
                const isReset: Player[] = isSettleBets.map(resetPlayer);

                return {...state, status: "FINISHED", deck:[], table: EMPTY_COMBO, players: isReset, previousPlayer: null, currentPlayer: null};
                
            }

            // Re-Sort after play
            currentPlayer.hand = sortCards(currentPlayer.hand, state.sortType);

            // Update previousPlayer and currentPlayer
            const previousPlayer: Player = currentPlayer;
            const nextPlayerIndex = (players.indexOf(previousPlayer) + 1) % state.players.length;
            const nextPlayer = players[nextPlayerIndex];
            
            console.log(`Player ${previousPlayer.name} played ${playedCards.map(cardId).join(", ")}. Next player: ${nextPlayer.name}`);

            return { ...state, table: evaluateCombo(playedCards), players: players, previousPlayer: previousPlayer, currentPlayer: nextPlayer };
        }

            
        case "PASS": {
            // First player can't pass && can't pass on new round
            if (!state.previousPlayer) return state;

            const currentPlayerIndex = (state.players.indexOf(state.currentPlayer!) + 1) % state.players.length;
            const currentPlayer = state.players[currentPlayerIndex];

            console.log(`Player ${state.currentPlayer!.name} passed. Next player: ${currentPlayer.name}`);

            // Round ends, reset table and previousPlayer
            if (state.previousPlayer.id === currentPlayer.id) {
                console.log("Round ends.");
                return { ...state, table: EMPTY_COMBO, previousPlayer: null, currentPlayer: currentPlayer };
            }

            return { ...state, currentPlayer: currentPlayer };
        }
 
        case "PAUSE_GAME":
            return state;
        case "RESUME_GAME":
            return state;

        default:
            return state;
    }
}
