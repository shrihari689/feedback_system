import "./App.css";
import "./loader.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/" component={HomePage}></Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
