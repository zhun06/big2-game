// Commands used by game engine

import type { Card } from "./card";

export type GameAction =
  | { type: "INIT_GAME" }
  | { type: "DEAL_CARDS" }
  | { type: "SORT_CARDS" }
  | { type: "PLAY_CARDS"; cards: Card[] }
  | { type: "PASS" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | { type: "END_GAME" };