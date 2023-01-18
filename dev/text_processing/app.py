from flask import Flask, jsonify, request, render_template
# from utils import extract_key_terms, write_file
import os
import sys
sys.path.append('..')
from graph_utils import create_graph, append_to_csv
from python_to_json import graph_to_js

app = Flask(__name__)

# default: render html
@app.route('/')
def index():
  return render_template('form.html')

# on form submission: trigger text processing logic built in python
@app.route('/process', methods=['GET', 'POST'])
def process():
    # POST request
    print(request)
    assert request.method == 'POST'

    text = request.form['user_input']
    # append to existing csv file
    append_status = append_to_csv(text)
    assert append_status == True

    # trigger text processing
    GRAPH, SIZES, ROOTS = create_graph()

    # # convert graph to d3 json object
    status = graph_to_js(GRAPH, SIZES, ROOTS)
    # assert status == True
    
    return 'OK', 200

if __name__ == "__main__":
  # Set environment variables
  os.environ['PYTHONDONTWRITEBYTECODE'] = '1'
  app.run(debug=True)