from flask import Flask

flaskapp = Flask(   __name__,
                    static_folder='./public',
                    template_folder='./static')

import templates.app.views