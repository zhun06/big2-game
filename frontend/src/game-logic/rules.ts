// All big-2 rules

import type { Card } from "@/types/card";
import type { Combo } from "@/types/combo";
import { evaluateCombo, isStrongerCombo } from "./combo";



// 1. Compare hand size 
// 2. Compare hand strength
export function isValidMove(table: Combo, playedCards: Card[]): boolean {
    const combo: Combo = evaluateCombo(playedCards);
    console.log(`table combo category: ${table.category}`)
    console.log(`playedCards combo category: ${combo.category}`)

    if (table.category === "INVALID") throw new Error("Invalid table, ending game..");
    if (combo.category === "INVALID") return false; // invalid hand size || invalid hand combo

    if (table.size === 0) return true; // first move

    // second move onwards
    if (table.size !== combo.size) return false // different hand size from table

    // Equal size (checked above): the played combo must strictly beat the table.
    // isStrongerCombo handles both same-category strength and the 5-card category
    // ranking (straight < flush < full house < four-of-a-kind < straight flush).
    switch(table.size) {
        case 1:
        case 2:
        case 3:
        case 5:
            return isStrongerCombo(combo, table);

        default: { // something went wrong
            throw new Error("Error evaluating valid move")
        }

    }

}