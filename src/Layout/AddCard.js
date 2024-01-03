import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import BreadCrumbBar from "./BreadCrumbBar";
import Form from "./Form";

function AddCard() {
    let deckNumber = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({front:'', back:''});

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
   
    const handleChange = (({target: {id, value}}) => {
        setCard({...card, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        async function cardAction () {
            const abortController = new AbortController();
            try {
                const response = await createCard(deckNumber.deckId, card, abortController.signal);
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
            <BreadCrumbBar level1={deck.name} level2="Add Card"/>
            <h2>{deck.name}: Add Card</h2>
            <Form card={card} handleSubmit={handleSubmit} handleChange={handleChange}/>
            <Link to={`/decks/${deckNumber.deckId}`}>
                    <button>Done</button>
            </Link>
                <button onClick={handleSubmit}>Save</button>
        </div>
    );
}

export default AddCard;