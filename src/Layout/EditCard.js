import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import BreadCrumbBar from "./BreadCrumbBar";

function EditCard() {
    const urlParams = useParams();
    console.log(urlParams);
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);

    useEffect(() => {
        let abortController = new AbortController();
        async function loadCard () {
            try{
                const response = await readDeck(urlParams.deckId, abortController.signal);
                setDeck(response);
                const cardData = await readCard(urlParams.cardId, abortController.signal);
                setCard(cardData)
                console.log(card);

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Error");
                } else {
                    throw error;
                }
            }
        }
        loadCard();
    }, []);

    const handleChange = (({target: {id, value}}) => {
        setCard({...card, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit newDeck to 
        async function callEditCard () {
            const abortController = new AbortController();
            try {
                const response = await updateCard(card, abortController.signal);
                window.location=`/decks/${urlParams.deckId}`;
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        callEditCard();
        // console.log(card);
        setCard({front:'', back:''});

    } 

    return (
        <div>
            <BreadCrumbBar level1={deck.name} level2={`Edit Card: ${urlParams.cardId}`} />
            <h2>Edit Card</h2>
            {/* I can't get Form working, yet...doing it the long way for now */}
            {/* <Form initValue={deckEdit} mode="Edit"/> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                    <textarea
                     id="front"
                     rows="4"
                     cols="30"
                     placeholder="Front of Card"
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
                        placeholder="Brief description of the deck"
                        onChange={handleChange}
                        value={card.back}
                    />
                <br />
                <Link to={`/decks/${urlParams.deckId}`}>
                    <button>Cancel</button>
                </Link>
                    <button type="submit">Submit</button>                
            </form> 
        </div>
    );
}

export default EditCard;