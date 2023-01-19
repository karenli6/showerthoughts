import React from 'react';
import { useRef, useCallback } from 'react';

import Graph from './Graph';
import RenderForm from './RenderForm';

// [DEBUG]
// import * as testdata from 'src/templates/flaskapp/text_processing/js_graph.json';
// import * as testdata from '../../../../../tmp/test-data.json';
import * as testdata from '../../../flaskapp/text_processing/js_graph.json'; 
// const fgRef = useRef(1);

function App() {
    return  ( 
        <div id="component-app">
        <h1>[ SHOWERTHOUGHTS-DEV ]</h1>
        <Graph data={ testdata } />
        <RenderForm />
    </div>

    );
  }

// class App extends React.Component {
//     render() {
//         return (
//             <div id="component-app">
//                 <h1>[ SHOWERTHOUGHTS-DEV ]</h1>
//                 <Graph data={ testdata } />
//                 <RenderForm />
//             </div>
//         );
//     }
// }

export default App;