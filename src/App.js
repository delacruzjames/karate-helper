import "./App.css";
import { useEffect, useReducer } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listLists } from "./graphql/queries";
import "semantic-ui-css/semantic.min.css";
import MainHeader from "./components/headers/MainHeader";
import Lists from "./components/list/Lists";
import { deleteList } from "./graphql/mutations";
import {
  onCreateList,
  onDeleteList,
  onUpdateList,
} from "./graphql/subscriptions";
import { Button, Container, Icon } from "semantic-ui-react";
import ListModal from "./components/modals/ListModal";
Amplify.configure(awsConfig);

const initialState = {
  id: "",
  title: "",
  description: "",
  lists: [],
  isModalOpen: false,
  modalType: "",
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case "DESCRIPTION_CHANGED":
      return { ...state, description: action.value };
    case "TITLE_CHANGED":
      return { ...state, title: action.value };
    case "UPDATE_LISTS":
      return { ...state, lists: [...action.value, ...state.lists] };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true, modalType: "add" };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        title: "",
        description: "",
        id: "",
      };
    case "DELETE_LIST":
      deleteListById(action.value);
      return { ...state };
    case "DELETE_LIST_RESULT":
      const newLists = state.lists.filter((item) => item.id !== action.value);
      return { ...state, lists: newLists };
    case "EDIT_LIST":
      const newValue = { ...action.value };
      delete newValue.children;
      delete newValue.listItems;
      delete newValue.dispatch;
      return {
        ...state,
        isModalOpen: true,
        modalType: "edit",
        id: newValue.id,
        title: newValue.title,
        description: newValue.description,
      };
    default:
      console.log("Default action for:", action);
      return state;
  }
}

async function deleteListById(id) {
  const result = await API.graphql(
    graphqlOperation(deleteList, { input: { id: id } })
  );
  console.log("Deleted list", result);
}

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    dispatch({ type: "UPDATE_LISTS", value: data.listLists.items });
  }
  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const createListSubscription = API.graphql(
      graphqlOperation(onCreateList)
    ).subscribe({
      next: ({ provide, value }) => {
        console.log("onCreateList called");
        dispatch({ type: "UPDATE_LISTS", value: [value.data.onCreateList] });
      },
    });

    const deleteListSubscription = API.graphql(
      graphqlOperation(onDeleteList)
    ).subscribe({
      next: ({ provide, value }) => {
        console.log("onDeleteList called");
        dispatch({
          type: "DELETE_LIST_RESULT",
          value: value.data.onDeleteList.id,
        });
      },
    });

    const updateListSubscription = API.graphql(
      graphqlOperation(onUpdateList)
    ).subscribe({
      next: ({ provide, value }) => {
        console.log("onUpdateList called");
        dispatch({
          type: "UPDATE_LISTS_RESULT",
          value: [value.data.onUpdateList],
        });
      },
    });

    return () => {
      createListSubscription.unsubscribe();
      deleteListSubscription.unsubscribe();
      updateListSubscription.unsubscribe();
    };
  }, []);

  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />
        <Button
          className="floatingButton"
          onClick={() => dispatch({ type: "OPEN_MODAL" })}
        >
          <Icon name="plus" className="floatingButton_icon"></Icon>
        </Button>
        <div className="App">
          <MainHeader />
          <Lists lists={state.lists} dispatch={dispatch} />
        </div>
      </Container>
      <ListModal state={state} dispatch={dispatch} />
    </AmplifyAuthenticator>
  );
}

export default App;
