import React from 'react';

// TODO: ideal text animation: https://codepen.io/g1eb/pen/MbrRry
function List(props) {
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