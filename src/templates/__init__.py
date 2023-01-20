from flask import Flask
# from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin

app = Flask(    __name__,
                static_folder='./public',
                template_folder='./static')

app.config['SECRET_KEY'] = 'dev'
CORS(app)

"""
# create socket server
socketIo = SocketIO(app, cors_allowed_origins="*")
app.host = 'localhost'
@socketIo.on("test")
def handleClientMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None
"""

import templates.flaskapp.views