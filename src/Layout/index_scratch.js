import React, { useState, useEffect } from "react";
import Header from "./Header";
// import NotFound from "./NotFound";
// import { Route, Switch, Link } from "react-router-dom";
// import CreateDeckButton from "./CreateDeckButton";
// import CreateDeck from "./CreateDeck";
// import data from "../data/db.json";
import { listDecks } from "../utils/api";
// import DeckList from "./DeckList";
// import Home from "./Home";
// import Study from "./Study";
// import DeckCard from "./DeckCard";

function Layout() {
  
  const [decks, setDecks] = useState([]); //API call req'd to get decks: listDecks()

  useEffect(() => {
    const abortController = new AbortController();
    async function getDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }

      }
    }
    getDecks();
    return () => {
      abortController.abort(); // Cancels any pending request or response
    };
  }, []);

  console.log(typeof(decks)); //[{...}, {...}]

  

  return (
    <div>
      <Header />
        {decks.map((thisDeck, index) => (
          <div key={thisDeck.id}>
            <p>{thisDeck.name}</p>
          </div>
        ))}
    </div>
  );
}

export default Layout;
