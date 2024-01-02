import React, { useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import BreadCrumbBar from "./BreadCrumbBar";



function EditDeck({setDecks}) {
    const deckNumber = useParams();
    const [deckEdit, setDeckEdit] = useState({name:'', description:''});
 
    const handleChange = (({target: {id, value}}) => {
        setDeckEdit({...deckEdit, 
            [id]: value,
        })
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        async function callEditDeck () {
            const abortController = new AbortController();
            try {
                const response = await updateDeck(deckEdit, abortController.signal);
                setDecks(response);
                window.location=`/decks/${response.id}`;
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        callEditDeck();
        console.log(deckEdit);
        setDeckEdit({name:'', description:''});

    } 

    useEffect(() => {
        let abortController = new AbortController();
        async function editDeck () {
            try {
                const response = await readDeck (deckNumber.deckId, abortController.signal);
                setDeckEdit(response);
            } catch (error) {
                if (error.name === "AbortError"){
                console.log("Aborted")
                } else {
                    throw error;
                }
            }
        }
        editDeck();
        return() => {
            abortController.abort();
        }
    }, [])


    return (
        <div>
            <BreadCrumbBar level1={deckEdit.name} level2="Edit Deck" />
            <h2>Edit Deck</h2>
            {/* I can't get Form working, yet...doing it the long way for now */}
            {/* <Form initValue={deckEdit} mode="Edit"/> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />
                    <input 
                     id="name"
                     type="text"
                     placeholder="Deck Name"
                     onChange={handleChange}
                     value={deckEdit.name}
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
                        value={deckEdit.description}
                    />
                <br />
                <Link to={`/decks/${deckNumber.deckId}`}>
                    <button>Cancel</button>
                </Link>
                    <button type="submit">Submit</button>                
            </form> 
        </div>
    );
}

export default EditDeck;