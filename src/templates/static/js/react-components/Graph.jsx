import React from 'react';
import { useRef, useCallback, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import List from './List';

// note: original strings stored in node.original_thoughts
function Graph(props) {
    const fgRef = useRef(1);

    const [thoughtList, setThoughtList] = useState([]);
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeClicked, setNodeClicked] = useState(false);

    const handleClick = useCallback(node => {

        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        // adjust camera position
        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node,
            3000
        );

        // update state
        setThoughtList(node.original_thoughts)
        setNodeLabel(node.id)
        setNodeClicked(true)

    }, [fgRef]);

    return (

        <div id="component-graph">
            <ForceGraph3D
                ref={fgRef}
                graphData={props.data}
                nodeLabel="id"
                nodeAutoColorBy="color_label"
                onNodeClick={handleClick}
                linkWidth={2}
            // cooldownTicks={100}
            // onEngineStop={() => fgRef.current.zoomToFit(400)}
            />

            {nodeClicked > 0 &&
             <div id="component-list">
                <List givenList={thoughtList} name={nodeLabel} />
            </div>
            }

            
        </div>

    );
}

export default Graph;