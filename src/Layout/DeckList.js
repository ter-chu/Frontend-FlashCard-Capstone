import React from "react";
import DeckCard from "./DeckCard";

function DeckList({decks, deleteFromCards}) {
    console.log({decks});
    
    if(decks.cards) {
        
        return (
            <div>
                <fieldset>
                <p>{decks.name}</p>
                {decks.map((thisDeck, index) => (
                    <div key={thisDeck.id}>
                    <DeckCard deck={thisDeck} deleteFromCards={deleteFromCards}/>
                    </div>
                    ))}
                </fieldset>
            </div>
        );
    }
}

export default DeckList;