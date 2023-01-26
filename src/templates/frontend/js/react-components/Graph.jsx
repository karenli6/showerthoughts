import React from 'react';
import { useRef, useCallback, useState , useEffect} from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import List from './List';

// note: original strings stored in node.original_thoughts
function Graph(props) {
    /// app

    // var app = {

    //     chars: ['this is my shower thought.','cats and dogs','9'],
    
    //     init: function () {
    //       app.container = document.createElement('div');
    //       app.container.className = 'animation-container';
    //       document.body.appendChild(app.container);
    //       window.setInterval(app.add, 400);
    //     },
    
    //     add: function () {
    //       var element = document.createElement('span');
    //       app.container.appendChild(element);
    //       app.animate(element);
    //     },
    
    //     animate: function (element) {
    //       var character = app.chars[Math.floor(Math.random() * app.chars.length)];
    //       var duration = Math.floor(Math.random() * 15) + 1;
    //       var offset = Math.floor(Math.random() * (50 - duration * 2)) + 3;
    //       var size = 10 + (15 - duration);
    //       element.style.cssText = 'right:'+offset+'vw; font-size:'+size+'px;animation-duration:'+duration+'s';
    //       element.innerHTML = character;
    //       window.setTimeout(app.remove, duration * 1000, element);
    //     },
    
    //     remove: function (element) {
    //       element.parentNode.removeChild(element);
    //     },
    
    //   };
    

    ///
    const fgRef = useRef(1);

    const [thoughtList, setThoughtList] = useState([]);
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeClicked, setNodeClicked] = useState(false);

    // node focus zoom-in mode
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
        console.log("handle click: ", node.original_thoughts)
        // app.init;
        setThoughtList(node.original_thoughts)
        setNodeLabel(node.id)
        setNodeClicked(true)

    }, [fgRef]);

    // const handleKeyDown = (event) => {
    //     console.log('A key was pressed', thoughtList);
    //   };
    
    //   useEffect(() => {
    //     console.log("clicked: checking thought list: ", thoughtList)
    //     window.addEventListener('keydown', handleKeyDown);
    
    //     // cleanup this component
    //     return () => {
    //       window.removeEventListener('keydown', handleKeyDown);
    //     };
    //   }, []);
    

    // highlighting links
    const thisGraph = props.data.graph
    const graphLinks = thisGraph.links
    const graphNodes = thisGraph.nodes
    let targetNode = null;

    // get randomly generated color array: referenced by index parseInt(color_label - 1)
    const coloring = props.data["colors"]

    graphNodes.forEach(node_obj => {
        if (node_obj["highlight"] == true){
            targetNode = node_obj["id"]
        }
    })
    console.log("TARGET NODE: ", targetNode)

    const highlightLinks = new Set();
    // // find target mode and identify all neighbors
    graphLinks.forEach(link_obj => {
        if (link_obj["source"] == targetNode ||link_obj["target"] == targetNode  ){
            highlightLinks.add(link_obj)
        }
    })

    // node highlighter
    const nodeHighlighter = (node) => {
        const index = parseInt(node.color_label)-1
        // console.log(index, coloring)

        if (node.highlight == true){
            return '#f2f2f2';
        }else{
            return coloring[index];
        }
        
    }

    return (

        <div id="component-graph">
            <ForceGraph3D
                ref={fgRef}
                graphData={props.data.graph}
                nodeLabel="id"
                nodeVal="size"
                nodeAutoColorBy="color_label"
                onNodeClick={handleClick}
                nodeColor={nodeHighlighter}
                linkWidth={link => highlightLinks.has(link) ? 5 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
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