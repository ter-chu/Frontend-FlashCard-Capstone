import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import BreadCrumbBar from "./BreadCrumbBar";
import { readDeck, deleteDeck } from "../utils/api";
import CardsInDeckView from "./CardsInDeckView";

function DeckDetails () {
    const { path } = useRouteMatch();
    const [deckInfo, setDeckInfo] = useState([]);
    const deckNumber = useParams();
       

    const handleDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            let abortController = new AbortController();
            deleteDeck(deckNumber.deckId, abortController.signal );
            window.location="/";
        }

    }

    useEffect (() => {
        let abortController = new AbortController();
        async function getDeck () {
            try{
                const response = await readDeck(deckNumber.deckId, abortController.signal);
                setDeckInfo(response);
            }
            catch (error) {
                if (error.name ==="AbortError") {
                    console.log("Error");
                } else {
                    throw error;
                }
            }

        }
        getDeck();
        return () => {
            abortController.abort();
        }
}, [deckNumber.deckId])
    return (
        <div>
            <BreadCrumbBar level1={deckInfo.name}/>
            <h2>{deckInfo.name}</h2>
            <p>{deckInfo.description}</p>
            <Link to={`${deckNumber.deckId}/edit`}>
            <button>Edit</button>
            </Link>
            <Link to={`${deckNumber.deckId}/study`}>
                <button>Study</button>
            </Link>
            <Link to={`${deckNumber.deckId}/cards/new`}>
                <button>+ Add Cards</button>
            </Link>
                <button onClick={handleDelete}>Delete</button>
            <br />
            <h2>Cards</h2>
            <CardsInDeckView />
        </div>
        
    );
};

export default DeckDetails;