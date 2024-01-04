import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams } from "react-router-dom";
import BreadCrumbBar from "./BreadCrumbBar";
import StudyCards from "./StudyCards";

function Study() {
    const [deck, setDeck] = useState([]);
    
    const deckNumber = useParams();  //yes, this works!
    
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            try {
                const response = await readDeck(deckNumber.deckId, abortController.signal );
                setDeck(response);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                  } else {
                    throw error;
                  }
            }
        }
        getDeck();
            return () => {
                abortController.abort();
        }
        
    }, [deckNumber.deckId]);
    if (deck.name) {
        return (
            <div>
                <BreadCrumbBar level1={deck.name} level2="Study"/>
                <h2>Study: {deck.name}</h2>
                <StudyCards deck={deck}/>
            </div>
    
        ) ;
    } else {
        return <p>Study Page</p>
    }
}

export default Study;