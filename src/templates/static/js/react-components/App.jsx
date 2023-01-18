import React from 'react';
import Graph from './Graph';
import RenderForm from './RenderForm';

// [DEBUG]
import * as testdata from '../../../../../tmp/test-data.json';

class App extends React.Component {
    render() {
        return (
            <div id="component-app">
                <h1>[ SHOWERTHOUGHTS-DEV ]</h1>
                <Graph data={ testdata } />
                <RenderForm />
            </div>
        );
    }
}

export default App;