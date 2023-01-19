from templates import app
from flask import render_template, request
from templates.flaskapp.text_processing.graph_utils import append_to_csv, create_graph
from templates.flaskapp.text_processing.python_to_json import graph_to_js

@app.route('/')
def index():
    return render_template("index.html")

@app.post('/process')
def process():
    # [DEBUG] print out submitted POST request contents
    print(f"[POST] shower thought added: \"${request.form['user_input']}\"")

    # POST request
    print(request)
    assert request.method == 'POST'

    text = request.form['user_input']
    # append to existing csv file
    append_status = append_to_csv(text)
    assert append_status == True

    # trigger text processing
    GRAPH, SIZES, ROOTS, THOUGHTS = create_graph()

    # # convert graph to d3 json object
    status = graph_to_js(GRAPH, SIZES, ROOTS, THOUGHTS)
    # assert status == True
    
    return 'OK', 200