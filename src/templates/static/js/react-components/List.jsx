import React from 'react';

function List(props) {
  console.log("REACHED LIST COMPONENT: ", props.givenList)
  const stringList = props.givenList;
  const listItems = stringList.map((thought) =>
    <li key={thought}>
      {thought}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}


export default List;