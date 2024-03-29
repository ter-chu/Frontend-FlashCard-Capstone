import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import BreadCrumbBar from "./BreadCrumbBar";
import Form from "./Form";

function EditCard() {
    const urlParams = useParams();
    // console.log(urlParams);
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);

    useEffect(() => {
        let abortController = new AbortController();
        async function loadCard () {
            try{
                const response = await readDeck(urlParams.deckId, abortController.signal);
                setDeck(response);
                const cardData = await readCard(urlParams.cardId, abortController.signal);
                setCard(cardData);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Error");
                } else {
                    throw error;
                }
            }
        }
        loadCard();
    }, [urlParams.deckId]);

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
        cardAction();
        setCard({front:'', back:''});

    } 
    return (
        <div>
            <BreadCrumbBar level1={deck.name} level2={`Edit Card: ${urlParams.cardId}`} />
            <h2>Edit Card</h2>
            <Form card={card} handleSubmit={handleSubmit} handleChange={handleChange}/>
            <Link to={`/decks/${urlParams.deckId}`}>
                    <button>Cancel</button>
            </Link>
                <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EditCard;