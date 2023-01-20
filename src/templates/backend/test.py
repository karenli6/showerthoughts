# used for testing purposes
from graph_utils import create_graph
from python_to_json import graph_to_js

import os
import sys

# NOTE: directories must be adjusted to run this file
# for testing purposes
GRAPH, SIZES, ROOTS, THOUGHTS_LIST = create_graph()

status = graph_to_js(GRAPH, SIZES, ROOTS, THOUGHTS_LIST)