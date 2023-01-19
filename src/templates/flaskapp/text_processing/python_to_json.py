# convert python graph to node object
# note: adapted from lotus (project)
import json

from .config import GRAPH_JSON_PATH

def graph_to_js(GRAPH, SIZES, ROOTS, outpath=GRAPH_JSON_PATH):
  print('graph to d3:')
  print('sizes:', SIZES)

  neo4j_obj = {
    "nodes": [], 
    "links": [],
  }

  visited = [] # List to keep track of visited nodes.
  queue = []   # Initialize a queue

  def bfs(group, graph, node):
    if node not in visited:
      neo4j_obj["nodes"].append({"id": node, "color_label": group, "size": SIZES[node]})
      visited.append(node) 
      queue.append(node) 

      while queue:
        s = queue.pop(0) 

        for child in graph[s]:
          if child not in visited:
            visited.append(child)
            neo4j_obj["nodes"].append({"id": child, "color_label": group,"size": SIZES[child]})

            # create link between node and neighbor
            neo4j_obj["links"].append({"source": s, "target": child, "value": 10})
            queue.append(child)


  color_label = 1
  for root in ROOTS:
    bfs(color_label, GRAPH, root)
    color_label +=1

  y = json.dumps(neo4j_obj)

  with open(outpath, "w") as outfile:
      outfile.write(y)
  
  return True