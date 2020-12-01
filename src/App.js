import "./App.css";
import "./loader.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig, sampleAdmins } from "./configs/mainConfigs";
import LoginPage from "./components/login/LoginPage";
import AdminFeedsPage from "./components/home/AdminHomePage";
import AdminFeedDetailsPage from "./components/feed/AdminFeedDetailsPage";
import AdminHelpPage from "./components/help/AdminHelpPage";
import AdminManageUsers from "./components/admin/adminManageUserPage";
import Loader from "./components/general/loadingPage";
import AddNewFeedPage from "./components/feed/AddNewFeed";
import FeedsPage from "./components/home/HomePage";
import FeedDetailsPage from "./components/feed/FeedDetailsPage";
import ProfilePage from "./components/profile/ProfilePage";
import UpdateProfilePage from "./components/profile/UpdateProfilePage";
import PhoneAuthPage from "./components/profile/PhoneAuthPage";
import HelpPage from "./components/help/HelpPage";
import AdminProfilePage from "./components/admin/AdminProfilePage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
    !sampleAdmins.includes(currentUser.email) &&
    currentUser.email.replace("@bitsathy.ac.in", "").includes(".")
  ) {
    if (!currentUser.phoneNumber) {
      return (
        <React.Fragment>
          <Switch>
            <Route path="/profile/verify" component={PhoneAuthPage}></Route>
            <Route
              path="/profile/update"
              render={(props) => (
                <UpdateProfilePage currentUser={currentUser} {...props} />
              )}
            ></Route>
            <Redirect from="/" to="/profile/update" />
          </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Switch>
            <Route path="/feeds" component={FeedsPage}></Route>
            <Route path="/feed/new" exact component={AddNewFeedPage}></Route>
            <Route path="/feed/:id" component={FeedDetailsPage}></Route>
            <Route path="/help" component={HelpPage}></Route>
            <Route
              path="/profile"
              exact
              render={(props) => (
                <ProfilePage currentUser={currentUser} {...props} />
              )}
            ></Route>
            <Redirect from="/" to="/feeds" />
          </Switch>
        </React.Fragment>
      );
    }
  }

  if (
    (currentUser != null &&
      !currentUser.email.replace("@bitsathy.ac.in", "").includes(".")) ||
    sampleAdmins.includes(currentUser.email)
  ) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/admin/feeds" component={AdminFeedsPage}></Route>
          <Route
            path="/admin/feed/:id"
            component={AdminFeedDetailsPage}
          ></Route>
          <Route path="/admin/profile/:id" component={AdminProfilePage}></Route>
          <Route path="/admin/help" component={AdminHelpPage}></Route>
          <Route
            path="/admin/manage/users"
            component={AdminManageUsers}
          ></Route>
          <Redirect from="/" to="/admin/feeds" />
        </Switch>
      </React.Fragment>
    );
  }

  return <div>Server Error!</div>;
};

export default App;
