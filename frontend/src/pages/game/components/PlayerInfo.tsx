// Username and image
import styles from "@/pages/game/Game.module.css";

function PlayerInfo({ name, balance, result }: { name: string, balance: number, result: string}) {
    return (
        <>
            <div className={styles.playerInfo}>
                Name: {name}
                <p>Result: {result}</p>
                Balance: {balance.toFixed(2)}
            </div>

        </>
    )

}

export default PlayerInfo;