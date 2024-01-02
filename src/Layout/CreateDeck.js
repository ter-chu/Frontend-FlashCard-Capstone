import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import BreadCrumbBar from "./BreadCrumbBar";
import { createDeck } from "../utils/api";
import DeckDetails from "./DeckDetails";
import Form from "./Form";

function CreateDeck({decks, setDecks}) {
    const initialFormState = {
        name: '',
        description: ''
    }
    const [newDeck, setNewDeck] = useState({...initialFormState});

    const handleChange = (({target: {id, value}}) => {
        setNewDeck({...newDeck, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        async function callCreateDeck () {
            const abortController = new AbortController();
            try {
                     const response = await createDeck(newDeck, abortController.signal);
                     setDecks(response);
                     console.log(decks);
                     window.location=`/decks/${response.id}`;
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        callCreateDeck();
        setNewDeck({name:'', description:''});

    } 

    return (
        <div>
            <BreadCrumbBar level1="Create Deck" />
            <h1>Create Deck</h1>
            {/* <Form initValue={initialFormState} mode="Create"/> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />
                    <input 
                     id="name"
                     type="text"
                     placeholder="Deck Name"
                     onChange={handleChange}
                     value={newDeck.name}
                />
                <br />
                <label htmlFor="description">Description</label>
                <br />
                    <textarea
                        id="description"
                        rows="4"
                        cols="30"
                        placeholder="Brief description of the deck"
                        onChange={handleChange}
                        value={newDeck.description}
                    />
                <br />
                <Link to="/">
                    <button>Cancel</button>
                </Link>
                    <button type="submit">Submit</button>                
            </form> 
        </div>
    );
}

export default CreateDeck;