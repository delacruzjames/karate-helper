import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";

function App(params) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/list">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
