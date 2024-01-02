import React from "react";
import { Link } from "react-router-dom";

function CreateDeckButton() {

    return (
        <div>
            <Link to="/decks/new">
                <button>+ Create New Deck</button>
            </Link>
        </div>
    );
}

export default CreateDeckButton;