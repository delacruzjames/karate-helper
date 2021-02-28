import { API, graphqlOperation } from "aws-amplify";
import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { createList, updateList } from "../../graphql/mutations";

function ListModal({ state, dispatch }) {
  async function patchList() {
    const { id, title, description } = state;
    const results = await API.graphql(
      graphqlOperation(updateList, { input: { id, title, description } })
    );
    dispatch({ type: "CLOSE_MODAL" });
    console.log("Edit data with result", results);
  }

  async function saveList() {
    const { title, description } = state;
    const results = await API.graphql(
      graphqlOperation(createList, { input: { title, description } })
    );
    dispatch({ type: "CLOSE_MODAL" });
    console.log("Save data with result", results);
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
