import React from 'react';

function RenderForm(){

    return (
        <div id="component-form">
            <h1>TESTING: click to submit shower thought </h1>
            <form action="/process"  method="POST">
                <label for="user_input">Type in your shower thought:</label>
                <input type="text" id="user_input" name="user_input" />
                <input type="submit" value="Click me" />
            </form>
        </div>
    );

}

export default RenderForm;