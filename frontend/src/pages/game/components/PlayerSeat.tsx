// Combines player hand and player info
import styles from "@/pages/game/Game.module.css";

import type { Player } from "@/types/player";
import type { Card } from "@/types/card";
import type { Sort } from "@/types/sort";

import PlayerHand from "./PlayerHand";
import PlayerInfo from "./PlayerInfo";

function PlayerSeat({ currentPlayer, player, selectedCards, onToggleCard } : {
    currentPlayer: Player | null;
    player?: Player;
    selectedCards?: Card[];
    onToggleCard: (card: Card) => void;
    sortType?: Sort;
}) {
    return (
        <>
            <div className={`${styles.playerSeat} ${currentPlayer !== player ? styles.hidden : ''}`}>
                <PlayerInfo name={player?.name ?? ""} balance={player?.balance ?? 0} result={player?.result ?? ""}/>
                <PlayerHand
                    cards={player?.hand ?? []}
                    selectedCards={selectedCards}
                    onToggleCard={onToggleCard}
            
                />
            </div>
        </>
    )
}

export default PlayerSeat;