from templates import app
from flask import render_template, request

@app.route('/')
def index():
    return render_template("index.html")

@app.post('/add')
def add():
    # [DEBUG] print out submitted POST request contents
    print(f"[POST] shower thought added: \"${request.form['user_input']}\"")

    return render_template("index.html")