from templates import app
from flask import render_template, request, session
from templates.flaskapp.text_processing.graph_utils import append_to_csv, create_graph
from templates.flaskapp.text_processing.python_to_json import graph_to_js
from templates.flaskapp.text_processing.config import GRAPH_JSON_PATH

@app.before_request
def initialize_session():
    if not 'graph_needs_update' in session:
        session['graph_needs_update'] = True
        load_graph()

def load_graph():
    if not session['graph_needs_update']:
        return

    # trigger text processing
    graph, sizes, roots = create_graph()

    # convert graph to d3 json object
    status = graph_to_js(graph, sizes, roots, outpath=GRAPH_JSON_PATH)
    status = status & graph_to_js(graph, sizes, roots, outpath="./public/js_graph.json")

    assert status == True

    session['graph_needs_update'] = False

    # [DEBUG]
    print("[DEBUG] Graph loaded.")

@app.route('/')
def index():
    return render_template("index.html")

"""
@app.post('/process')
def process():
    # [DEBUG] print out submitted POST request contents
    print(f"[POST] shower thought added: \"${request.form['user_input']}\"")

    # POST request
    # print(request)
    assert request.method == 'POST'

    text = request.form['user_input']
    # append to existing csv file
    append_status = append_to_csv(text)
    assert append_status == True

    session['graph_needs_update'] = True

    load_graph()
    
    return 'OK', 200
"""