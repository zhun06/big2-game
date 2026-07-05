// Defines a player's hand
import styles from "@/pages/game/Game.module.css";

import type { Card as CardType } from "@/types/card";
import { cardId } from "@/types/card";

import Card from "./Card";

function PlayerHand({ cards, selectedCards, onToggleCard }: {
    cards: CardType[]
    selectedCards?: CardType[];
    onToggleCard: (card: CardType) => void
}) {
    const isSelected = (card: CardType) => selectedCards?.some(c => cardId(c) === cardId(card)) ?? false;

    const renderCard = (card: CardType) => (
        <Card
            key={cardId(card)}
            card={card}
            selected={isSelected(card)}
            onClick={() => onToggleCard(card)}
        />
    );

    return (
        <div className={styles.playerHand}>
            {cards.map(renderCard)}
        </div>
    );
}

export default PlayerHand;
