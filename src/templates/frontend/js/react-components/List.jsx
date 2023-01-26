import React , {useEffect} from 'react';

// TODO: ideal text animation: https://codepen.io/g1eb/pen/MbrRry
function List(props) {
////
  var app = {

    chars: ['this is my shower thought.','cats and dogs','9'],

    init: function () {
      app.container = document.createElement('div');
      app.container.className = 'animation-container';
      document.body.appendChild(app.container);
      window.setInterval(app.add, 400);
    },

    add: function () {
      var element = document.createElement('span');
      app.container.appendChild(element);
      app.animate(element);
    },

    animate: function (element) {
      var character = app.chars[Math.floor(Math.random() * app.chars.length)];
      var duration = Math.floor(Math.random() * 15) + 1;
      var offset = Math.floor(Math.random() * (50 - duration * 2)) + 3;
      var size = 10 + (15 - duration);
      element.style.cssText = 'right:'+offset+'vw; font-size:'+size+'px;animation-duration:'+duration+'s';
      element.innerHTML = character;
      window.setTimeout(app.remove, duration * 1000, element);
    },

    remove: function (element) {
      element.parentNode.removeChild(element);
    },

  };


  ////    
    const handleKeyDown = (event) => {
      console.log('A key was pressed');
      console.log(props.givenList)
    };
  
    useEffect(() => {
      window.addEventListener('keydown', app.init);
  
      // cleanup this component
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

  const stringList = props.givenList;
  const listItems = stringList.map((thought) =>
    <li key={thought}>
      {'"'+thought+'"'}
    </li>
  );
  return (
    <div>
      <h1>
        {props.name}
      </h1>
      <ul>{listItems}</ul>

    </div>
  );
}


export default List;