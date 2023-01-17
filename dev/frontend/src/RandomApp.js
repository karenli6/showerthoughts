import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';

const random_data = require("./random-data.js");

function RandomApp() {
    return(
        <div id="root">
            <h1>[ DEV ]</h1>
            <ForceGraph3D graphData={ random_data.genRandomTree() }/>
        </div>
    );
}

export default RandomApp;