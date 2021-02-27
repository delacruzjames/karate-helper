import React from "react";
import { Item } from "semantic-ui-react";

function List({ title, description, createdAt }) {
  return (
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{title}</Item.Description>
        <Item.Extra>{new Date(createdAt).toDateString()}</Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default List;
