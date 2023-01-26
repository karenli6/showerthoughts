from flask import Flask, jsonify, request, render_template, json
import os
import sys
from csv import writer

from backend.graph_utils import create_graph
from backend.python_to_json import graph_to_js

app = Flask(    __name__,
                static_folder='./public',
                template_folder='./frontend')

@app.route('/')
def default():
  return render_template('index.html')

# process user innput
@app.route('/process', methods=['GET', 'POST'])
def process():
    # POST request
    print("SUCCESSS - REACHED FLASK")
    incoming_req = request.get_json()
    incoming_thought = [incoming_req["package"]]
    assert request.method == 'POST'

    # append to csv file
    with open('backend/shower_thoughts_testing.csv', 'a+', newline='') as f_object:  
        csv_writer = writer(f_object)
        csv_writer.writerow(incoming_thought)
        f_object.close()

    # trigger text processing
    GRAPH, SIZES, ROOTS, THOUGHTS_LIST = create_graph()

    json_obj = graph_to_js(GRAPH, SIZES, ROOTS, THOUGHTS_LIST, incoming_thought[0])

    response = app.response_class(
        response=json_obj,
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
  app.run(debug=True)