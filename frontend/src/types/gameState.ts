// Universal source of truth

import type { Card } from "./card";
import type { Player } from "./player";
import type { Sort } from "./sort";
import type { Combo } from "./combo";

export type GameState = {
  status: GameStatus;
  deck: Card[];
  table: Combo; // Table is always a valid combo (previously played cards)
  players: Player[]; // [human, bot1, bot2, bot3] — each carries its own hand
  sortType: Sort; // current sort type for the players' hands
  bet: number; // bet per card 
  previousPlayer: Player | null;
  currentPlayer: Player | null; 
}; 

export const GAME_STATUS = ["NOT_STARTED", "PLAYING", "FINISHED"] as const;

export type GameStatus = typeof GAME_STATUS[number];