from flask import Flask, jsonify, request, render_template
import os
import sys

from flaskapp.text_processing.graph_utils import append_to_csv

app = Flask(    __name__,
                static_folder='./public',
                template_folder='./static')

@app.route('/')
def default():
  return render_template('index.html')


@app.route('/process', methods=['GET', 'POST'])
def process():
    # POST request
    print("SUCCESSS - REACHED FLASK")
    incoming_req = request.get_json()
    incoming_thought = incoming_req["package"]

 
    assert request.method == 'POST'

    # # append to existing csv file
    append_status = append_to_csv(incoming_thought)
    assert append_status == True

    # # trigger text processing
    # GRAPH, SIZES, ROOTS = create_graph()

    # # # convert graph to d3 json object
    # status = graph_to_js(GRAPH, SIZES, ROOTS)
    # # assert status == True
    
    return 'OK', 200

if __name__ == "__main__":
  # Set environment variables
  # os.environ['PYTHONDONTWRITEBYTECODE'] = '1'
  app.run(debug=True)