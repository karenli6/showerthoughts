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

    // for link highlight
    const graphLinks = props.data["links"]
    const graphNodes = props.data["nodes"]
    let targetNode = null;


    graphNodes.forEach(node_obj => {
        console.log(node_obj)
        if (node_obj["highlight"] == true){
            targetNode = node_obj["id"]
        }
    })


    const highlightLinks = new Set();
    // // find target mode and identify all neighbors
    graphLinks.forEach(link_obj => {
        console.log(link_obj)
        if (link_obj["source"] == targetNode){
            highlightLinks.add(link_obj)
        }
    })

      // node highlighter
      const nodeHighlighter = (node) => {
        // console.log("CHECKING NODE COLOR", node.highlight, node)
        if (node.highlight == true){
            return 'red';
        }else{
            return 'rgba(0,255,255,0.6)';
        }
        
        }


    console.log("thse are the target node and links: " , targetNode, highlightLinks)
    return (

        <div id="component-graph">
            <ForceGraph3D
                ref={fgRef}
                graphData={props.data}
                nodeLabel="id"
                nodeVal="size"
                nodeAutoColorBy="color_label"
                onNodeClick={handleClick}
                // linkWidth={2}
                nodeColor={nodeHighlighter}
                linkWidth={link => highlightLinks.has(link) ? 5 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}

                // linkWidth={linkWidthHighlighter}

                // linkDirectionalParticles={linkDirectionHighlighter}
       
                // nodeCanvasObjectMode={node => node.highlight ? 'before' : undefined}
                // nodeCanvasObject={paintRing}
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