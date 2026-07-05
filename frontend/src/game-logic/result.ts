import type { GameState } from "@/types/gameState";
import type { Player } from "@/types/player";

// Sets winner and losers
export function setResults(players: Player[]): Player[] {
    return players.map(p => ({
        ...p,
        result: p.hand.length === 0 ? "win" : "lose",
    }));
}


export function settleBets(players: Player[], bet: GameState["bet"]): Player[] {
    let pot: number = 0;
    const isSettleBets: Player[] = players.map(p =>({...p}));
    
    isSettleBets.forEach(p => {
        if (p.hand.length > 0) {
            const loss: number = p.hand.length * bet; 
            p.balance -= loss;
            pot += loss;
            console.log(`${p.name} loses $${loss}`);
        }
        
    })

    isSettleBets.forEach(p => {
        if (p.hand.length === 0) {
            p.balance += pot;
            console.log(`${p.name} wins $${pot}`);
        }
    });

    return isSettleBets;
}