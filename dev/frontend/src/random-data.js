// via {https://github.com/vasturiano/react-force-graph}/example/datasets/random-data.js

export function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      [reverse ? 'target' : 'source']: id,
      [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
    }))
  };
}