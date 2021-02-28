import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { createList, updateList } from "../../graphql/mutations";
import UploadImages from "../handleImages/UploadImages";
import useS3 from "../hooks/useS3";

function ListModal({ state, dispatch }) {
  const [uploadToS3] = useS3();
  const [fileToUpload, setFileToUpload] = useState();

  async function patchList() {
    const { id, title, description } = state;
    const results = await API.graphql(
      graphqlOperation(updateList, { input: { id, title, description } })
    );
    dispatch({ type: "CLOSE_MODAL" });
    console.log("Edit data with result", results);
  }

  async function saveList() {
    const imageKey = uploadToS3(fileToUpload);
    const { title, description } = state;
    const results = await API.graphql(
      graphqlOperation(createList, { input: { title, description, imageKey } })
    );
    dispatch({ type: "CLOSE_MODAL" });
    console.log("Save data with result", results);
  }

  function getSelectedFile(fileName) {
    console.log("getFile");
    setFileToUpload(fileName);
  }
  return (
    <Modal open={state.isModalOpen} dimmer={"blurring"}>
      <Modal.Header>
        {state.modalType === "add" ? "Create " : "Edit "}
        your list
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            error={true ? false : { content: "Please add name to your list" }}
            label="Title"
            placeholder="Osu!"
            value={state.title}
            onChange={(event) =>
              dispatch({ type: "TITLE_CHANGED", value: event.target.value })
            }
          />
          <Form.TextArea
            label="Description"
            placeholder="Description . . ."
            value={state.description}
            onChange={(event) =>
              dispatch({
                type: "DESCRIPTION_CHANGED",
                value: event.target.value,
              })
            }
          />
          <UploadImages getSelectedFile={getSelectedFile} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
          Cancel
        </Button>
        <Button
          positive
          onClick={state.modalType === "add" ? saveList : patchList}
        >
          {state.modalType === "add" ? "Save" : "Update"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ListModal;
