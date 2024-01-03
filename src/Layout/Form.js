import React from "react";
function Form({card, handleSubmit, handleChange }) {
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">Front</label>
                <br />
                    <textarea 
                     id="front"
                     type="text"
                     rows="4"
                     cols="30"
                     placeholder="Front side of card"
                     onChange={handleChange}
                     value={card.front}
                />
                <br />
                <label htmlFor="back">Back</label>
                <br />
                    <textarea
                        id="back"
                        rows="4"
                        cols="30"
                        placeholder="Back side of card"
                        onChange={handleChange}
                        value={card.back}
                    />
                <br />
                </form> 
        </div>
    );
}

export default Form;