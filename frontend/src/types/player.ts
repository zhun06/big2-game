// Defines a player's information

import type { Card } from "@/types/card";

export type Player = {
    id: string;
    name: string;
    balance: number;
    hand: Card[];
    result: "none" | "win" | "lose";
};