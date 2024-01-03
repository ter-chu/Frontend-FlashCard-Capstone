import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import CardInDeck from "./CardInDeck";

function CardsInDeckView() {
    const deckNumber = useParams();
    const [cards, setCards] = useState([]);

useEffect (() => {
        let abortController = new AbortController();
        async function getCards () {
            try{
                const response = await readDeck(deckNumber.deckId, abortController.signal);
                setCards(response.cards);
            }
            catch (error) {
                if (error.name ==="AbortError") {
                    console.log("Error");
                } else {
                    throw error;
                }
            }

        }
        getCards();
        return () => {
            abortController.abort();
        }
}, [])
    return (
        <div>
            {cards.map((thisCard, index) => (
                <div key={thisCard.id}>
                <CardInDeck card={thisCard} index={index} deckId={deckNumber.deckId} cardId={thisCard.id}/>
                </div>
                ))}
        </div>
    );
}

export default CardsInDeckView;