import React, {useState} from 'react';

import Graph from './Graph';
import AddThoughtForm from './AddThoughtForm';

import * as testdata from '../../../backend/js_graph.json';
var serverhost = 'http://127.0.0.1:5000';

function App() {
  const [graphData, setGraphData] = useState(testdata);

  // form functionalities
  let [newthought, setNewthought] = useState("");

  const submitFunction = (e) => {
    e.preventDefault();
    console.log(newthought)
    var url_req = serverhost + '/process';
    console.log("sending to this API: ", url_req)

    // API call
    fetch(url_req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "package": newthought })
    }).then(function (response) {
      return response.text();
    }).then(function (text) {
      console.log('POST response received');
      let colors_and_graph = JSON.parse(text)
      // update state of graph data
      setGraphData(colors_and_graph)

    });
  }

  // form input function
  let handleChange = (e) => {
    let name = e.target.value;
    setNewthought(name);
  }

  return (
    <div id="component-app">
      <div id="component-app-title">
        <h1>[ #showerthoughts ]</h1>
      </div>
      <div id="component-app-elements">
        <Graph data={graphData} />
        <AddThoughtForm submitHandler={ submitFunction } onChangeHandler={ handleChange } />
      </div>
    </div>
  );
}

/*
<div id="component-form">
    <h1>TESTING: click to submit shower thought </h1>
    <form onSubmit={submitFunction}>
        <label for="user_input">Type in your shower thought:</label>
        <input type="text" id="user_input" name="user_input" onChange={handleChange} />
        <input type="submit" value="Click me" />
    </form>
</div>
*/

export default App;