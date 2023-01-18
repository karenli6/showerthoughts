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

~~softly in order of importance:~~

- ~~add `onHover` property to nodes: show group number (JSON `group`) + topic label (JSON `id`)~~
- ~~add color to nodes according to group number~~
- color graph edges (somehow...)
- ~~add form for adding new thoughts at runtime (contained in React component `showerthoughts/text_processing/templates/render_form.js`)~~
- ~~add styling (bootstrap.css?)~~
- integrate real-time updates of graph on backend when new thoughts are added with frontend
- actually make everything look good (styling, animation, positioning...)

other:

- software licensing? NPM package is currently "ISC" (npm default)

## ideas

- create separate page for input form? maybe have the graph zoom waayyy out and then show the form on a separate space-y page either on
    command or after a set period of time; the zoom goes back in when the form is submitted and a new thought is added to the graph
- add `onHover` on cluster to fit-to-screen (basically zoom into the group of nodes); to keep this action separate from the node labelling,
    maybe require a short period of time to stay hovering to activate group-zoom (ideally also have a lil timer graphic to indicate that the
    action requires more `onHover` time to activate)
- have help dialogs to explain what actions are available (one at a time) that fade in and fade out during periods of user inactivity