// React only re-render on new object reference, 
// Always make new objects,
// Never mutate existing objects

import styles from "./Game.module.css";
import reactLogo from "@/assets/react.svg";

import { useState, useReducer } from "react";

import type { Card } from "@/types/card";
import { cardId } from "@/types/card";
import { EMPTY_COMBO } from "@/types/combo";
import { GameEngine } from "@/game-logic/gameEngine";

import PlayerSeat from "@/pages/game/components/PlayerSeat";
import Table from "@/pages/game/components/Table";



function Game() {
    const [state, dispatch] = useReducer(GameEngine, {
        status: "NOT_STARTED",
        deck: [],
        table: EMPTY_COMBO,
        players: [],
        sortType: "BY_RANK",
        bet: 0,
        currentPlayer: null,
        previousPlayer: null,
    });  

    const [selectedCards, updateSelectedCards] = useState<Card[]>([]);
    
    const handleToggle: (card: Card) => void = (card: Card) => {
        const isSelected = selectedCards.some(c => cardId(c) === cardId(card));
        
        if (isSelected) {
            updateSelectedCards(selectedCards.filter(c => cardId(c) !== cardId(card)));
        }
        else {
            updateSelectedCards([...selectedCards, card]);
        }
    };

    return (
        <>
            <div className={styles.title}>
                <h1>Chor Dai Di</h1>
                <img src={reactLogo} alt="React logo" />
            </div>
           
           <div className={styles.content}>
                <Table combo={state.table}/>

                <PlayerSeat     
                    currentPlayer={state.currentPlayer}
                    player={state.players[0]}
                    selectedCards={selectedCards}
                    onToggleCard={handleToggle}
                />
                <PlayerSeat 
                    currentPlayer={state.currentPlayer}
                    player={state.players[1]}
                    selectedCards={selectedCards}
                    onToggleCard={handleToggle}
                />
                <PlayerSeat 
                    currentPlayer={state.currentPlayer}
                    player={state.players[2]}
                    selectedCards={selectedCards}
                    onToggleCard={handleToggle}
                />
                <PlayerSeat 
                    currentPlayer={state.currentPlayer}
                    player={state.players[3]}
                    selectedCards={selectedCards}
                    onToggleCard={handleToggle}
                />

                <div className={`${styles.buttonContainer} ${state.status === "PLAYING" ? styles.hidden : ""}`}>
                    <button 
                        onClick={() => {
                            dispatch({ type: "INIT_GAME" });
                            dispatch({ type: "DEAL_CARDS" });
                        }}
                        className={styles.button}>
                        Start
                    </button>
                </div> 

                <div className={`${styles.buttonContainer} ${state.status === "PLAYING" ? "" : styles.hidden}`}>
                    <div className={styles.sortContainer}>
                        <button 
                            onClick={() => dispatch({ type: "SORT_CARDS" })}
                            className={styles.button}>
                            Sort
                        </button>
                        <p>By: {state.sortType}</p>
                    </div>
                    <button 
                        onClick={() => {
                            dispatch({ type: "PLAY_CARDS", cards: selectedCards });
                            updateSelectedCards([]);   // reset selected cards
                        }}
                        className={styles.button}>
                        Play
                    </button>
                    <button 
                        onClick={() => {dispatch({ type: "PASS" })}}
                        className={styles.button}>
                        Pass
                    </button>
                    <button 
                        onClick={() => updateSelectedCards([])}
                        className={styles.button}>
                        Reset
                    </button>
                </div>
           </div>
        </>
    );
}

export default Game