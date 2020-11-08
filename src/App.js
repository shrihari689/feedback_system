import "./App.css";
import "./loader.css";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig } from "./configs/mainConfigs";
import LoginPage from "./components/login/LoginPage";
import AdminFeedsPage from "./components/home/AdminHomePage";
import AdminFeedDetailsPage from "./components/feed/AdminFeedDetailsPage";
import AdminHelpPage from "./components/help/HelpPage";
import AddNewFeedPage from "./components/feed/AddNewFeed";
import FeedsPage from "./components/home/HomePage";
import FeedDetailsPage from "./components/feed/FeedDetailsPage";
import AdminManageUsers from "./components/admin/adminManageUserPage";
import Loader from "./components/general/loadingPage";
import ProfilePage from "./components/profile/ProfilePage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const histroy = useHistory();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // if (user == null) {
      //   histroy.replace("/login");
      // } else if (user == null && !window.location.href.includes("/login")) {
      //   histroy.replace("/login");
      // } else if (
      //   user != null &&
      //   !user.email.toLowerCase().endsWith("@bitsathy.ac.in")
      // ) {
      //   alert("Please Sign In using @bitsathy account!");
      //   firebase
      //     .auth()
      //     .signOut()
      //     .then((result) => {
      //       window.location.href = "/login";
      //     });
      // } else if (user != null && !user.phoneNumber) {
      //   // histroy.replace("/help");
      // } else if (user != null) {
      //   const dbRef = firebase.firestore().collection("Users").doc(user.uid);
      //   dbRef
      //     .get()
      //     .then((result) => {
      //       console.log("Done!");
      //       alert(JSON.stringify(result));
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
      if (user != null) {
        setCurrentUser(user);
      } else {
        setCurrentUser(false);
      }
    });
  }, []);

  if (currentUser == null) {
    return <Loader></Loader>;
  }

  if (currentUser === false) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login" component={LoginPage}></Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </React.Fragment>
    );
  }

  if (
    currentUser != null &&
    currentUser.email.replace("@bitsathy.ac.in", "").includes(".")
  ) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/feeds" component={FeedsPage}></Route>
          <Route path="/feed/new" exact component={AddNewFeedPage}></Route>
          <Route path="/feed/:id" component={FeedDetailsPage}></Route>
          <Route path="/help" component={AdminHelpPage}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
          <Route path="/profile/update" component={ProfilePage}></Route>
          <Redirect from="/" to="/feeds" />
        </Switch>
      </React.Fragment>
    );
  }

  if (
    currentUser != null &&
    !currentUser.email.replace("@bitsathy.ac.in", "").includes(".")
  ) {
    return (
      <React.Fragment>
        <Route path="/admin/feeds" component={AdminFeedsPage}></Route>
        <Route path="/admin/feed/:id" component={AdminFeedDetailsPage}></Route>
        <Route path="/admin/help" component={AdminHelpPage}></Route>
        <Route path="/admin/manage/users" component={AdminManageUsers}></Route>
        <Redirect from="/" to="/admin/feeds" />
      </React.Fragment>
    );
  }
};

export default App;
