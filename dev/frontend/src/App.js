import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';

import * as jsonFile from "./data.json";

function App() {
    return(
        <div id="root">
            <h1>[ DEV ]</h1>
            <ForceGraph3D graphData={ jsonFile } />
        </div>
    );
}

export default App;