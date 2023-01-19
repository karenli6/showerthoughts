import React from 'react';
import { useRef, useCallback } from 'react';

import ForceGraph3D from 'react-force-graph-3d';




  function Graph(props) {
      const fgRef = useRef(1);
const handleClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }, [fgRef]);

    return  ( 

      <div  id="component-graph">
        <ForceGraph3D
            ref={fgRef}
            graphData={props.data }
            nodeLabel="id"
            nodeAutoColorBy="group"
            onNodeClick={handleClick}
        />
      </div>

    );
  }


// class Graph extends React.Component {
//     render() {
//         return  ( 
//             // <div id="component-graph">
//             //     <ForceGraph3D 
//             //         graphData={ this.props.data }
//             //         nodeLabel="id"
//             //         nodeAutoColorBy="group" 
//             //     />
//             // </div>
//           <div  id="component-graph">
//             <ForceGraph3D
//                 // ref={fgRef}
//                 graphData={this.props.data }
//                 nodeLabel="id"
//                 nodeAutoColorBy="group"
//                 // onNodeClick={handleClick}
//             />
//           </div>

//         );
//     }
// }


// const Graph = () => {
//     const fgRef = useRef();

//     const handleClick = useCallback(node => {
//       // Aim at node from outside it
//       const distance = 40;
//       const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

//       fgRef.current.cameraPosition(
//         { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
//         node, // lookAt ({ x, y, z })
//         3000  // ms transition duration
//       );
//     }, [fgRef]);

//     return <ForceGraph3D
//       ref={fgRef}
//       graphData={data}
//       nodeLabel="id"
//       nodeAutoColorBy="group"
//       onNodeClick={handleClick}
//     />;
//   };

// fetch('../datasets/miserables.json').then(res => res.json()).then(data => {


//   ReactDOM.render(
//     <FocusGraph />,
//     document.getElementById('graph')
//   );
// });

export default Graph;