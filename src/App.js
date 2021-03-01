import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import List from "./List";

function App(params) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/list/:slug"
          render={(props) => {
            return <List {...props} />;
          }}
        />
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
