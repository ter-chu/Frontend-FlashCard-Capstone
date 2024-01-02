import React from "react";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import DeckCard from "./DeckCard";

function Home({decks}) {
    return (
        <div>
            <CreateDeckButton />
            {decks.map((thisDeck, index) => (
                <div key={thisDeck.id}>
                <DeckCard deck={thisDeck} index={index} />
                </div>
                ))}
        </div>
    );
}

export default Home;