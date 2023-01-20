import React, { useState } from 'react';


var serverhost = 'http://127.0.0.1:5000';

function RenderForm() {
    let [newthought, setNewthought] = useState("");

    const submitFunction = (e) => {
        e.preventDefault();
        console.log(newthought)
        var url_req = serverhost + '/process';
        console.log("sending to this API: ", url_req)

        // fetch API
        fetch(url_req, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "package": newthought })
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
                console.log('POST response: ');
                // Should be 'OK' if everything was good
                console.log(text);
        });
    }

    let handleChange = (e) => {
        let name = e.target.value;
        console.log(name)

        setNewthought(name);
    }

    return (
        <div id="component-form">
            <h1>TESTING: click to submit shower thought </h1>
            <form onSubmit={submitFunction}>
                <label for="user_input">Type in your shower thought:</label>
                <input type="text" id="user_input" name="user_input" onChange={handleChange} />
                <input type="submit" value="Click me" />
            </form>
        </div>
    );

}

export default RenderForm;