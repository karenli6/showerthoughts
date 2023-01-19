from templates import app

from flask import Flask, jsonify, request, render_template
import os
import sys
## custom imports
# from templates.flaskapp.text_processing.graph_utils import 

flask_app = Flask(__name__)

@flask_app.route('/process', methods=['GET', 'POST'])
def process():
    # POST request
    print("SUCCESSS - REACHED FLASK")
    print(request)
    assert request.method == 'POST'

    # text = request.form['user_input']
    # # append to existing csv file
    # append_status = append_to_csv(text)
    # assert append_status == True

    # # trigger text processing
    # GRAPH, SIZES, ROOTS = create_graph()

    # # # convert graph to d3 json object
    # status = graph_to_js(GRAPH, SIZES, ROOTS)
    # # assert status == True
    
    return 'OK', 200

if __name__ == "__main__":
  # Set environment variables
  os.environ['PYTHONDONTWRITEBYTECODE'] = '1'
  flask_app.run(debug=True)

app.run()