import React from 'react';
import { useRef, useCallback, useState , useEffect} from 'react';
import ForceGraph3D from 'react-force-graph-3d';
// import { initAnimations } from "../lib/utils"

const doubleClickTimeout_ms = 200;
const doubleClickZoom_ms = 2000;

// note: original strings stored in node.original_thoughts
function Graph(props) {

    const fgRef = useRef(1);
    const [thoughtList, setThoughtList] = useState([]);
    const [nodeLabel, setNodeLabel] = useState("");

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

        setThoughtList(node.original_thoughts)
        setNodeLabel(node.id)
        props.nodeClickFunction(true)

    }, [fgRef]);

    // add control to zoom out to default view on double-click
    const clickTimer = useRef(null);
    const handleBackgroundClick = (e) => {
        if (clickTimer.current == null) {
            //console.log("setting double click");
            clickTimer.current = setTimeout(function() {
                clickTimer.current = null;
                //console.log("double click timed out");
            }, doubleClickTimeout_ms);
        }
        // double click was successful, so zoom out
        else {
            fgRef.current.zoomToFit(doubleClickZoom_ms);
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }
    };
    
    // highlighting links
    const thisGraph = props.data.graph
    const graphLinks = thisGraph.links
    const graphNodes = thisGraph.nodes
    let targetNode = null;

    // get randomly generated color array: referenced by index parseInt(color_label - 1)
    const coloring = props.data["colors"]

    // identify targetNode
    graphNodes.forEach(node_obj => {
        if (node_obj["highlight"] == true){
            targetNode = node_obj["id"]
        }
    })
    console.log("TARGET NODE: ", targetNode)

    const highlightLinks = new Set();

    // highlight link
    graphLinks.forEach(link_obj => {
        if (link_obj["source"] == targetNode ||link_obj["target"] == targetNode  ){
            highlightLinks.add(link_obj)
        }
    })

    // node highlighter
    const nodeHighlighter = (node) => {
        const index = parseInt(node.color_label)-1
        if (node.highlight == true){
            return '#f2f2f2';
        }else{
            return coloring[index];
        }
        
    }

    // text animations
    const initAnimations = () => {
        let appContainer;
        let index= 0;
        /// functions
        const addElement = () => {
            var element = document.createElement('span');
            element.className='component-span';
            appContainer.appendChild(element);
            animateElement(element);
        }
        const removeElement = (element) => {
            element.parentNode.removeChild(element);
       
        }
        //////
        const animateElement = (element) => {
            if (index == thoughtList.length){
                // terminate animations
                console.log("visualized all possible quotes");
                document.body.removeChild(appContainer);
    
            } else{
                var character = '('+nodeLabel+'): "'+thoughtList[index]+'"';
                var duration = Math.floor(Math.random() * 15) + 10;
                var offset = Math.floor(Math.random() * (50 - duration * 2)) + 3;
                var size = 10 + (15 - (Math.floor(Math.random() * 15) + 1));
                element.style.cssText = 'right:'+offset+'vw; font-size:'+size+'px;animation-duration:'+duration+'s';
                element.innerHTML = character;
                window.setTimeout(removeElement, duration * 900, element);
                index +=1;
            }
        }
        
        // create container element
        appContainer=document.createElement('div');
        // set appropriate ID
        appContainer.className = 'component-list';
        // add to body
        document.body.appendChild(appContainer);
        window.setInterval(addElement, 3000);
    }

    // for text animation
    useEffect(() => {
        initAnimations();

        return () => {
            console.log("return call from effects in Graph")
        };
    }, [thoughtList]); 

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
                onBackgroundClick={ handleBackgroundClick }
            />
        </div>

    );
}

export default Graph;