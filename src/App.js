import "./App.css";
import { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import "semantic-ui-css/semantic.min.css";
import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/list/Lists";
import { Button, Container, Icon, Modal, Form } from "semantic-ui-react";
Amplify.configure(awsConfig);

function App() {
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
            />
            <Form.TextArea
              label="Description"
              placeholder="Description . . ."
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
