// NOTE: may not need this
import React from 'react';

function List(props) {

  const stringList = props.givenList;
  const listItems = stringList.map((thought) =>
    <li key={thought}>
      {'"'+thought+'"'}
   
    </li>
  );
  return (
    <div>
      <h3>
        {"The generated umbrella topic is: " + props.name}
      </h3>
      <ul id="inlineList">{listItems}</ul>


    </div>
  );
}


export default List;