import React from 'react';
import Graph from './Graph';

// [DEBUG]
import * as testdata from '../../../tmp/test-data.json';

class App extends React.Component {
    render() {
        return (
            <div id="component-app">
                <h1>[ SHOWERTHOUGHTS-DEV ]</h1>
                <Graph data={ testdata } />
            </div>
        );
    }
}

export default App;