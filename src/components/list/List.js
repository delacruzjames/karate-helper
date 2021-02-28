import { Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Icon, Item } from "semantic-ui-react";

function List(props) {
  const { title, description, imageKey, createdAt, dispatch } = props;
  const [imageUrl, setImageUrl] = useState(
    "https://react.semantic-ui.com/images/wireframe/image.png"
  );

  async function fetchImageUrl() {
    const imgUrl = await Storage.get(imageKey);
    setImageUrl(imgUrl);
  }

  useEffect(() => {
    if (imageKey) {
      fetchImageUrl();
    }
  }, []);
  return (
    <Item>
      <Item.Image size="tiny" src={imageUrl} />
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
