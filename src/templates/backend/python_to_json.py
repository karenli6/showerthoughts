# convert python graph to node object
# note: adapted from lotus (project)
import json
from .color_generator import get_color_array

## converts graph object to
def graph_to_js(GRAPH, SIZES, ROOTS, THOUGHTS, highlight_thought):
  print('incoming thought:', highlight_thought)

  neo4j_obj = {
    "nodes": [], 
    "links": [],
  }

  visited = [] # List to keep track of visited nodes.
  queue = []   # Initialize a queue

  def bfs(group, graph, node):
    if node not in visited:

      neo4j_obj["nodes"].append({
        "id": node, 
        "color_label": group, 
        "size": SIZES[node],
        "original_thoughts":THOUGHTS[node],
        "highlight": highlight_thought in THOUGHTS[node]
      })
      visited.append(node) 
      queue.append(node) 

      while queue:
        s = queue.pop(0) 

        for child in graph[s]:
          if child not in visited:
            visited.append(child)
            # check if incoming thought is in corresponding list
            node_highlight = highlight_thought in THOUGHTS[child]

            neo4j_obj["nodes"].append({
              "id": child, 
              "color_label": group,
              "size": SIZES[child],
              "original_thoughts":THOUGHTS[child],
              "highlight": node_highlight 
            })
            # define link
            neo4j_obj["links"].append({"source": s, "target": child, "value": 10})
            queue.append(child)


  color_label = 1
  for root in ROOTS:
    bfs(color_label, GRAPH, root)
    color_label +=1
  
  ## generate random colors
  color_array = get_color_array(len(ROOTS))
  total_package = {
    "graph": neo4j_obj, 
    "colors": color_array
  }

  y = json.dumps(total_package)

  with open("backend/js_graph.json", "w") as outfile:
      outfile.write(y)
  
  return y