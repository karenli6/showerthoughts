from templates import flaskapp
from flask import render_template

@flaskapp.route('/')
def index():
    return render_template("index.html")
