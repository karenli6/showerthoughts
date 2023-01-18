import React, { Component } from 'react';
import ForceGraph3D from 'react-force-graph-3d';

class Graph extends React.Component {
    render() {
        return  ( 
            <div id="component-graph">
                <ForceGraph3D 
                    graphData={ this.props.data }
                    nodeLabel="id"
                    nodeAutoColorBy="group" />
            </div>
        );
    }
}

export default Graph;