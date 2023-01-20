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

      <h1>
        {props.name}
      </h1>
      <ul>{listItems}</ul>

    </div>
  );
}


export default List;