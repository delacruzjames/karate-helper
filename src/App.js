import "./App.css";
import { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import "semantic-ui-css/semantic.min.css";
import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/list/Lists";
import { Button, Container, Icon } from "semantic-ui-react";
Amplify.configure(awsConfig);

function App() {
  const [lists, setLists] = useState([]);
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
    console.log(data);
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Button className="floatingButton">
        <Icon name="plus" className="floatingButton_icon"></Icon>
      </Button>
      <Container>
        <div className="App">
          <MainHeader />
          <Lists lists={lists} />
        </div>
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
