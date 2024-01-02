import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, Link } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api";
import Home from "./Home";
import Study from "./Study";
import AddCard from "./AddCard";
import DeckDetails from "./DeckDetails";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";

function Layout() {
  const [cards, setCards] = useState([]); 
  const [decks, setDecks] = useState([]); 
  
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


  const deleteFromCards = (indexToDelete) => { 
    setCards.filter((currentCards) => 
      currentCards.filter((ignored, index) => index != indexToDelete));
  }

  return (
    <div>
      <Header />
      <div className="container">   
        <Switch>
          <Route exact={true} path="/">
          <Home decks={decks} />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks}/>
            </Route>
          <Route exact={true} path="/decks/:deckId">
              <DeckDetails />
            </Route>
            <Route exact={true} path="/decks/:deckId/study"> 
              <Study />              
            </Route>
            <Route exact={true} path="/decks/:deckId/cards/new">
              <AddCard />
            </Route>
            <Route exact={true} path="/decks/:deckId/edit">
              <EditDeck setDecks={setDecks}/>
            </Route>
            <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
              <EditCard />
            </Route>
            <Route>
            <NotFound />
            </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
