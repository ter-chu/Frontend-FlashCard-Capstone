import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import BreadCrumbBar from "./BreadCrumbBar";

function AddCard() {
    let deckNumber = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);

    const handleChange = (({target: {id, value}}) => {
        setCard({...card, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        async function callEditDeck () {
            const abortController = new AbortController();
            try {
                const response = await createCard(deckNumber.deckId, card, abortController.signal);
                window.location=`/decks/${deckNumber.deckId}`;
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        callEditDeck();
        setDeck({name:'', description:''});

    } 

    useEffect(() => {
        let abortController = new AbortController();
        async function editDeck () {
            try {
                const response = await readDeck (deckNumber.deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                if (error.name === "AbortError"){
                console.log("Aborted")
                } else {
                    throw error;
                }
            }
        }
        editDeck();
        return() => {
            abortController.abort();
        }
    }, [])
   
    return (
        <div>
            <BreadCrumbBar level1={deck.name} level2="Add Card"/>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                    <textarea 
                     id="front"
                     rows="2"
                     cols="30"
                     placeholder="Front side of card"
                     onChange={handleChange}
                     value={deck.front}
                />
                <br />
                <label htmlFor="back">Description</label>
                <br />
                    <textarea
                        id="back"
                        rows="3"
                        cols="30"
                        placeholder="Back side of card"
                        onChange={handleChange}
                        value={deck.back}
                    />
                <br />
                <Link to={`/decks/${deckNumber.deckId}`}>
                    <button>Done</button>
                </Link>
                    <button type="submit">Save</button>                
            </form> 
        </div>
    );
}

export default AddCard;