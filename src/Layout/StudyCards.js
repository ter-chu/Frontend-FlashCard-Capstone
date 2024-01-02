import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function StudyCards({deck}) {
    let urlParam = useParams();
    let cardList = [...deck.cards];
    console.log(deck);
    const [cardNumber, setCardNumber] = useState(0);
    const [cardDirection, setCardDirection] = useState('front');

    const handleFlip = (event) => {
        event.preventDefault();
        if (cardDirection==='front') {
            setCardDirection('back');
            console.log("flipped from front to back");
        } else {
            setCardDirection('front');
            console.log("flipped from back to front");
        }

    };
    
    const handleNext = (event) => {
        event.preventDefault();
        setCardDirection('front');
        if (cardNumber < cardList.length-1) {
            setCardNumber(cardNumber+1);
        } else {
            if (window.confirm("Restart Cards? Click 'cancel' to return to the home page.")) {
                setCardNumber(0);
            } else {
                window.location="/";
            }
        }
    }

    if (cardList.length < 3) {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study.  There are {cardList.length} cards in this deck</p>
                    <Link to={`/decks/${urlParam.deckId}/cards/new`}>
                        <button>+ Add Cards</button>
                    </Link>
                
            </div>
        );
    }
    if (cardDirection==='front') {
        return (
            <div>
                <h3>{`Card ${cardNumber+1} of ${cardList.length}`}</h3>
                <p>{deck.cards[cardNumber].front}</p>
                <button onClick={handleFlip}>Flip</button>
            </div>
           
        );
    } else {
        return (
            <div>
                <h3>{`Card ${cardNumber+1} of ${cardList.length}`}</h3>
                <p>{cardList[cardNumber].back}</p>
                <button onClick={handleFlip}>Flip</button>
                <button onClick={handleNext}>Next</button>
            </div>
           
        );
    }
}

export default StudyCards;
