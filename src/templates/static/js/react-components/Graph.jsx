import React from 'react';
import { useRef, useCallback , useState} from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import List from './List';


// note: original thought strings stored in node.original_thoughts
function Graph(props) {
    const fgRef = useRef(1);
    
    const [thoughtList, setThoughtList] = useState([]);

    const handleClick = useCallback(node => {
        
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        // adjust camera position
        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );

        // console.log(node)
        setThoughtList(node.original_thoughts)
    }, [fgRef]);

    return (

        <div id="component-graph">
            <ForceGraph3D
                ref={fgRef}
                graphData={props.data}
                nodeLabel="id"
                nodeAutoColorBy="color_label"
                onNodeClick={handleClick}
            />
            <div id="component-list">
                <List givenList={thoughtList}/>
            </div>
        </div>

    );
}

export default Graph;