import React from "react";
import { Link, useRouteMatch} from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardInDeck({card, deckId, cardId}) {
    
    let {path} = useRouteMatch();

    const handleDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            let abortController = new AbortController();
            deleteCard(cardId, abortController.signal);
            window.location=`/decks/${deckId}`;
        }
    }


    return (
        <div> 
            <div>
                <p>{`${card.front}`}</p>
            </div>  
            <div>
                <p>{`${card.back}`}</p>
                <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>
                    <button>Edit</button>
                </Link >
                <button onClick={handleDelete}>Delete</button>
            </div>    

            
        </div>
    );
}
export default CardInDeck;