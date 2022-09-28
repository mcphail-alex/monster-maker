import React from 'react';


const Party = props => {

    //props needed :
    //function for submitting the form
    //this will add to the state and call the fetch from the API to get the necessary monsters back
    //this should render up a form with 2 inputs and a button which will submit the party size and level to the submitParty function
    function handleSubmit(e) {
        e.preventDefault();
        //const form = document.querySelector('form')
        // const formData = new FormData(form);
        // console.log(formData);
        // const partySize = document.querySelector('difficulty-level');
        // console.log(difficultyLevel);
        // const difficultyLevel = document.querySelector('difficulty-level');
        // console.log(difficultyLevel);
        console.log(e.target.partySize.value, e.target.partyLevel.value, e.target.difficultyLevel.value);
        props.submitPartyInfo(e.target.partySize.value, e.target.partyLevel.value, e.target.difficultyLevel.value);
    }

    return (
        <div>
            <h2>Tell me about your party...</h2>
            {/* <img src="https://static.wikia.nocookie.net/star-wars-legends/images/e/ec/Malakili_SWCT.png/revision/latest/scale-to-width-down/250?cb=20190205064222" alt='Malakili' className='flavor-Malakili'></img> */}

            <form onSubmit={handleSubmit}>
                <label htmlFor='partySize' >How many adventurers in your party?:</label>
                <input id='partySize' type='number' name='partySize' min='1' max='20' />
                <label htmlFor='partyLevel' >What level are they?:</label>
                <input id='partyLevel' type='number' name='partyLevel' min='1' max='20' />
                <fieldset>
                    <legend>How are you feeling about them today?</legend>

                    <div>
                        <input type="radio" id="easy" name="difficultyLevel" value="easy"
                        />
                        <label htmlFor="easy">We're all just having fun...</label>
                    </div>

                    <div>
                        <input type="radio" id="medium" name="difficultyLevel" value="medium" />
                        <label htmlFor="medium">Let's see what they got...</label>
                    </div>

                    <div>
                        <input type="radio" id="hard" name="difficultyLevel" value="hard" />
                        <label htmlFor="hard">Stop making jokes, Devin...</label>
                    </div>
                    <div>
                        <input type="radio" id="deadly" name="difficultyLevel" value="deadly" />
                        <label htmlFor="dealy">Cry HAVOC, and realease the dogs of WAR!</label>
                    </div>
                </fieldset>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
}

export default Party;