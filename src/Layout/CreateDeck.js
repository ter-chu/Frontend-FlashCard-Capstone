import React from "react";
import BreadCrumbBar from "./BreadCrumbBar";
import Form from "./Form";

function CreateDeck() {
    const initialFormState = {
        name: '',
        description: ''
    }
 
    return (
        <div>
            <BreadCrumbBar level1="Create Deck" />
            <h1>Create Deck</h1>
            <Form initValue={initialFormState} mode="Create"/>
            
        </div>
    );
}

export default CreateDeck;