// Functions to modify Player

import type { Player } from "@/types/player";
import type { Card } from "@/types/card";
import type { BotName } from "@/types/bot";

export function createPlayer(name: string): Player {
    return {
        id: crypto.randomUUID(),
        name,
        balance: 1000,
        hand: [],
        result: "none"
    }
}

export function createBot(name: BotName): Player {
    return {
        id: crypto.randomUUID(),
        name,
        balance: 1000,
        hand: [],
        result: "none"
    }
}

export function setPlayerHand(player: Player, hand: Card[]): Player {
    return {
        ...player,
        hand: hand,
    }
}

export function resetPlayer(player: Player): Player {
    return {
        ...player,
        hand: [],
    }
}