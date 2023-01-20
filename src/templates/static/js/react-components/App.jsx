import React from 'react';

import Graph from './Graph';
import RenderForm from './RenderForm';

// [DEBUG]
import * as testdata from '../../../flaskapp/text_processing/js_graph.json'; 

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