import React from 'react';

function Render_form() {
    return(
      <div>
      <h1>TESTING: click to submit shower thought </h1>
      <form action="/process"  method="POST">
          <label for="user_input">Type in your shower thought:</label>

          <input type="text" id="user_input" name="user_input"/ >
          <input type="submit" value="Click me" />
      </form>
      
      <button> <a href="/process">Click me</a></button>
  </div>
    );
}

export default Render_form;