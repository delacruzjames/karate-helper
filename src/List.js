import React from "react";

function List(props) {
  console.log(props);
  return <h1>List = {props.match.params.slug} </h1>;
}

export default List;
