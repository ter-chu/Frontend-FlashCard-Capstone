import React from "react";
import { Switch, Link, Route, useRouteMatch} from "react-router-dom/cjs/react-router-dom.min";
import Study from "./Study";
import { deleteDeck } from "../utils/api";

function DeckCard({deck}) {

    let {path} = useRouteMatch();
    console.log(deck.cards.length);
    const handleDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            let abortController = new AbortController();
            deleteDeck(deck.id, abortController.signal);
            window.location="/";
        }
    }

    return (
        <div>
    
            <h2>{(deck.name)}</h2>
            <h4>{`${deck.cards.length} cards`}</h4>
            <p>{(deck.description)}</p>
            <Link to={`/decks/${deck.id}/study`}>
                <button>Study</button>
            </Link>
            <Link to={`/decks/${deck.id}`}>
                <button>View</button>
            </Link>
                <button to="delete" onClick={handleDelete}>Delete</button>
            <Switch>
            <Route path={`${path}/decks/:deckId/study`}> 
                <Study deck={deck}/>
            </Route>
            </Switch>

        </div>
    );
 
}

export default DeckCard;