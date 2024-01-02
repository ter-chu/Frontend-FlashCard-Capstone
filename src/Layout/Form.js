import React, { useEffect, useState} from "react";
import { Link, Route } from "react-router-dom";
import BreadCrumbBar from "./BreadCrumbBar";
import { updateCard, createCard } from "../utils/api";
import DeckDetails from "./DeckDetails";

function Form({cardInput, deckId, mode}) {
    let response = {};
    
    const [card, setCard] = useState(cardInput);
    // setCard({cardInput});

    const handleChange = (({target: {id, value}}) => {
        setCard({...card, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit newDeck to 
        async function cardAction () {
            const abortController = new AbortController();
            try {
                if (mode === "Edit") {
                     response = await updateCard(card, abortController.signal);
                } else {
                     response = await createCard(deckId, card, abortController.signal);
                }
            window.location=`/decks/${deckId}`;
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        cardAction();
        setCard({front:'', back:''});

    } 
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                    <textarea 
                     id="front"
                     type="text"
                     rows="4"
                     cols="30"
                     placeholder="Front side of card"
                     onChange={handleChange}
                     value={card.front}
                />
                <br />
                <label htmlFor="back">Back</label>
                <br />
                    <textarea
                        id="back"
                        rows="4"
                        cols="30"
                        placeholder="Back side of card"
                        onChange={handleChange}
                        value={card.back}
                    />
                <br />
                <Link to={`/decks/${deckId}`}>
                    <button>Cancel</button>
                </Link>
                    <button type="submit">Submit</button>                
            </form> 
        </div>
    );
}

export default Form;