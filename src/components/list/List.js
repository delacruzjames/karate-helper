import React from "react";
import { Item } from "semantic-ui-react";

function List({ title, description }) {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{title}</Item.Description>
      </Item.Content>
    </Item>
  );
}

export default List;
