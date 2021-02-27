import "./App.css";
import { useEffect, useReducer, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import "semantic-ui-css/semantic.min.css";
import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/list/Lists";
import { Button, Container, Icon, Modal, Form } from "semantic-ui-react";
Amplify.configure(awsConfig);

const initialState = {
  title: "",
  description: "",
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case "DESCRIPTION_CHANGED":
      return { ...state, description: action.value };
    case "TITLE_CHANGED":
      return { ...state, title: action.value };
    default:
      console.log("Default action for:", action);
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
    console.log(data);
  }
  useEffect(() => {
    fetchList();
  }, []);

  function toggleModal(action) {
    setIsModalOpen(action);
  }
  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />
        <Button className="floatingButton" onClick={() => toggleModal(true)}>
          <Icon name="plus" className="floatingButton_icon"></Icon>
        </Button>
        <div className="App">
          <MainHeader />
          <Lists lists={lists} />
        </div>
      </Container>
      <Modal open={isModalOpen} dimmer={"blurring"}>
        <Modal.Header>Create your list</Modal.Header>
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
          <Button negative onClick={() => toggleModal(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => toggleModal(false)}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
