import React from 'react';

import Graph from './Graph';
import RenderForm from './RenderForm';

import * as testdata from '../../../backend/js_graph.json'; 

function App() {
    
    // parse through
    return  ( 
        <div id="component-app">
        <h1>[ #showerthoughts ]</h1>
        <Graph data={ testdata } />
        <RenderForm />
    </div>

    );
  }

export default App;