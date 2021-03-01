import React from "react";
import ListHeader from "./components/headers/ListHeader";

function List(props) {
  console.log(props);
  return (
    <>
      <ListHeader />
      <h1>LIST NAME: {props.match.params.slug}</h1>
    </>
  );
}

export default List;
