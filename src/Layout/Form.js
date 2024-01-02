import React, { useEffect, useState} from "react";
import { Link, Route } from "react-router-dom";
import BreadCrumbBar from "./BreadCrumbBar";
import { createDeck, updateDeck } from "../utils/api";
import DeckDetails from "./DeckDetails";

function Form({initValue, mode}) {
    let response = {};
    
    const [newDeck, setNewDeck] = useState({...initValue});

    const handleChange = (({target: {id, value}}) => {
        setNewDeck({...newDeck, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit newDeck to 
        async function callCreateDeck () {
            const abortController = new AbortController();
            try {
                if (mode === "Edit") {
                     response = await updateDeck(newDeck, abortController.signal);
                } else {
                     response = await createDeck(newDeck, abortController.signal);
                }
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
        console.log(newDeck);
        setNewDeck({name:'', description:''});

    } 
    return (
        <div>
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

export default Form;