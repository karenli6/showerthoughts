import React from 'react';

function RenderForm(){
    // commenting out this version b/c idk what you wanted to do with the second "Click me" button;
    // we can easily add it back in if you had a plan

    // render() {
    //     return (
    //         <div id="component-form">
    //             <h1>TESTING: click to submit shower thought </h1>
    //             <form action="/add"  method="POST">
    //                 <label for="user_input">Type in your shower thought:</label>
    //                 <input type="text" id="user_input" name="user_input" />
    //                 <input type="submit" value="Click me" />
    //             </form>
    //             <button><a href="/add">Click me</a></button>
    //         </div>
    //     );
    // }


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