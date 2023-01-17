import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const random_data = require("./random-data.js");

function App() {
    return(
        <div id="root">
            <h1>[ DEV ]</h1>
            <ForceGraph2D graphData={ random_data.genRandomTree() }/>
        </div>
    );
}

export default App;