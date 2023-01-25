
# Shower thoughts in liminal spaces

Shower thoughts: a sudden idea that occurs to a person during an unconnected mundane activity.  a.k.a. the most interesting expressions of our creativity and randomness.

The inclusion of gesture controls is intended to make the audience’s interaction with others’ thoughts more concrete. Being able to affect the display of concepts with bodily gestures helps bridge the gap between the mental and the physical.


# Developer guide: 
## Directory and File Structure: 
NOTE: 
- 'dev' is the folder for temporary code/notes that aren't part of the final product.
- 'src' is the folder containing final code files.
- CURRENTLY: ONLY WORKING WITHIN SRC. 

## How to set up and run the app & backend
1. Set up Python virtual environment. Enter your python virtual environment and install all dependencies (`pip install -r requirements.txt`).
2. JAVASCRIPT: enter the `src` directory --> 'cd templates' --> 'cd frontend' --> run `npm i` to install needed nodejs modules


After dependencies are added, the app can be run anytime via the following:
1. Open 2 terminals. 
2. First, in one terminal, run the react frontend: 'cd templates' --> 'cd frontend' --> 'npm run watch'
3. next, in the SECOND terminal, start the backend: run flask backend in one terminal: 'cd src' -> 'cd templates' --> 'python3 -B app.py'
4. open a browser and go to [localhost:5000](https://127.0.0.1:5000)

## TODO


~~softly in order of importance:~~
- on LOAD: contain nodes within canvas.
- ~~add `onHover` property to nodes: show group number (JSON `group`) + topic label (JSON `id`)~~
- ~~add color to nodes according to group number~~
- color graph edges (somehow...)
- ~~add form for adding new thoughts at runtime (contained in React component `showerthoughts/text_processing/templates/render_form.js`)~~
- ~~add styling (bootstrap.css?)~~
- integrate real-time updates of graph on backend when new thoughts are added with frontend
- actually make everything look good (styling, animation, positioning...)

other:

- software licensing? NPM package is currently "ISC" (npm default)

## Ideas

- (suggested by Peggy) add control to allow user to control "strength" of partitioning? is there a way to have the NLP make it "easier" or "harder" to group/draw connections between thoughts? adds to the "things in between" idea of the exhibit and also the physical outside of the showerthoughts room

- create separate page for input form? maybe have the graph zoom waayyy out and then show the form on a separate space-y page either on
    command or after a set period of time; the zoom goes back in when the form is submitted and a new thought is added to the graph
- add `onHover` on cluster to fit-to-screen (basically zoom into the group of nodes); to keep this action separate from the node labelling,
    maybe require a short period of time to stay hovering to activate group-zoom (ideally also have a lil timer graphic to indicate that the
    action requires more `onHover` time to activate)
- have help dialogs to explain what actions are available (one at a time) that fade in and fade out during periods of user inactivity


# Written project proposal
[LINK](https://docs.google.com/document/d/1z_XaB_Nkq3_TmX9vxULkrqsZ2MO20u3tCEZ2iM6lBpg/edit?usp=sharing)

# Credits
Direct contributors: @trifork3, @karenli6
References, resources, and inspiration: @cynthia9chen, (project) [lotus](https://github.com/karenli6/lotus)
https://github.com/vasturiano/react-force-graph

metalab @ Harvard Advisor: Dr. des. Kim Frederic Albrecht, Principal Investigator metaLAB (at) Harvard & FU Berlin
