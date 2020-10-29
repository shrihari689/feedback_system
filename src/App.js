import "./App.css";
import "./loader.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import firebase from "firebase/app";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import { firebaseConfig } from "./configs/mainConfigs";
import AdminFeedDetailsPage from "./components/feed/AdminFeedDetailsPage";
function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/feeds" component={HomePage}></Route>
        <Route path="/feed/:id" component={AdminFeedDetailsPage}></Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
