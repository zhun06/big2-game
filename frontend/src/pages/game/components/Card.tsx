// Defines a poker card
import styles from "@/pages/game/Game.module.css";
import type { Card as CardType } from "@/types/card";
import { suitIcons } from "@/constants/cardIcons";

function Card({ card, selected, onClick } : {
    card: CardType;
    selected?: boolean;
    onClick?: () => void;
}) {
    const SuitIcon = suitIcons[card.suit];
    return (
        <>
            <button onClick={onClick} className={`${styles.card} ${selected ? styles.cardSelected : ""} ${styles[card.suit]}`}>
                <SuitIcon className={`${styles[card.suit]} ${styles.suitIcon}`} />
                <p className={styles.cardRank}>{card.rank}</p>
            </button>
        </>
    )
}

export default Card;