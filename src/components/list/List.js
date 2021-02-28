import React from "react";
import { Icon, Item } from "semantic-ui-react";

function List(props) {
  const { id, title, description, createdAt, dispatch } = props;
  return (
    <Item>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          {new Date(createdAt).toDateString()}
          <Icon
            name="edit"
            className="ml-3"
            onClick={() => dispatch({ type: "EDIT_LIST", value: props })}
          />
          <Icon
            name="trash"
            onClick={() => dispatch({ type: "DELETE_LIST", value: props })}
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default List;
