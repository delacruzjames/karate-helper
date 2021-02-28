import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

function ListModal({ state, dispatch, saveList }) {
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
        <Button positive onClick={{state.modalType === "add" ? saveList : saveList}}>
          {state.modalType === "add" ? "Save" : "Update"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ListModal;
