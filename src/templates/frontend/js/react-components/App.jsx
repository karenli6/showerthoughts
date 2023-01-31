import React, {useState} from 'react';
import Graph from './Graph';
import AddThoughtForm from './AddThoughtForm';
import * as testdata from '../../../backend/js_graph.json';

// NOTE: production mode
var serverhost = 'http://127.0.0.1:5000';

function App() {

  // states used for graph
  const [graphData, setGraphData] = useState(testdata);
  const [nodeClicked, setNodeClicked] = useState(false);

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
      setNodeClicked(false)

    });

    // clear input
    setNewthought("");
  }

  // form input function
  let handleChange = (e) => {
    let name = e.target.value;
    setNewthought(name);
  }

  return (
    <div id="component-app">
      <div id="component-app-elements">
        <Graph data={graphData} nodeClick={nodeClicked} nodeClickFunction={setNodeClicked}/>
        <AddThoughtForm submitHandler={ submitFunction } onChangeHandler={ handleChange } inputValue={newthought} />
      </div>
    </div>
  );
}

export default App;