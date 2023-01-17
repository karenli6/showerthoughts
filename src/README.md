# how to run the thing

to run the app, you first have to download its dependencies:
1. PYTHON: enter your python virtual environment and install all dependencies (`pip install -r requirements.txt`)
2. JAVASCRIPT: enter the `templates/src` directory and run `npm i` to install needed nodejs modules

after dependencies are added, the app can be run anytime via the following:
1. open two terminals (two programs need to be running simultaneously, but this will likely change)
2. in the first terminal, enter the `templates/src` directory and run `npm run watch`
3. in the second terminal (assuming you're within your python virtual environment), go the root directory of the app (`showerthoughts/src`) and run `python run.py`
4. open a browser and go to [localhost:5000](https://127.0.0.1:5000)

## TODO

software licensing? NPM package is currently "ISC" (npm default)