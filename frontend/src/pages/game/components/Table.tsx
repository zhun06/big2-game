import styles from "@/pages/game/Game.module.css";

import type { Combo } from "@/types/combo";
import { cardId } from "@/types/card";

import Card from "./Card";

function Table({combo}: {combo: Combo}) {
    return(
        <>
            <div className={styles.table}>
                {combo.cards.map((card) => {
                    return (
                        <Card 
                            key={cardId(card)} 
                            card={card}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default Table