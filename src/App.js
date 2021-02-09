import "./App.css";
import "./loader.css";
import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig, isSuperAdmin } from "./configs/mainConfigs";
import LoginPage from "./components/login/LoginPage";
import AdminLoginPage from "./components/login/AdminLoginPage";
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
import WrongMail from './components/general/WrongMail';
import AdminMyFeedsPage from './components/admin/AdminMyFeeds';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        if(isSuperAdmin(user) && !user.displayName) {
          user.updateProfile({
            displayName: "Feedback Admin",
            photoURL: "/favicon.png"
          });
        }
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
          <Route path="/admin/login" component={AdminLoginPage}></Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
  if (currentUser != null && !currentUser.email.toLowerCase().endsWith('@bitsathy.ac.in')) {    
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login/wrong_email" render={(props) => <WrongMail {...props} user={currentUser} />}></Route>
          <Redirect from="/" to="login/wrong_email" />
        </Switch>
      </React.Fragment>
    );
  }



  if (
    currentUser != null &&
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
  
  if ( isSuperAdmin(currentUser)) {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/admin/feeds"
            render={(props) => <AdminFeedsPage user={currentUser} {...props} />}
          ></Route>
          <Route
            path="/admin/feed/:id"
            render={(props) => (
              <AdminFeedDetailsPage user={currentUser} {...props} />
            )}
          ></Route>
          <Route
            render={(props) => (
              <AdminProfilePage user={currentUser} {...props} />
            )}
            path="/admin/profile/:id"
          ></Route>
          <Route
            render={(props) => <AdminHelpPage user={currentUser} {...props} />}
            path="/admin/help"
          ></Route>
          <Route
            path="/admin/manage/users"
            render={(props) => (
              <AdminManageUsers user={currentUser} {...props} />
            )}
          ></Route>
          <Redirect from="/" to="/admin/feeds" />
        </Switch>
      </React.Fragment>
    );
  }

  if (
    (currentUser != null &&
      !currentUser.email.replace("@bitsathy.ac.in", "").includes("."))  
    ) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/admin/feeds" component={AdminFeedsPage}></Route>
          
          <Route
            path="/admin/myfeeds"
            render={(props) => <AdminMyFeedsPage user={currentUser} {...props} />}
          ></Route>
          <Route
            path="/admin/feed/:id"
            component={AdminFeedDetailsPage}
          ></Route>
          <Route path="/admin/profile/:id" component={AdminProfilePage}></Route>
          <Route path="/feed/new" 
            render={(props) => <AddNewFeedPage isAdmin={true} user={currentUser} {...props} />}
            exact></Route>
          <Route path="/feed/:id" 
            render={(props) => <FeedDetailsPage isAdmin={true} user={currentUser} {...props} />}
          ></Route>
          <Route path="/admin/help" component={AdminHelpPage}></Route>
          <Redirect from="/" to="/admin/feeds" />
        </Switch>
      </React.Fragment>
    );
  }

  return <h2>Server Error!</h2>;
};

export default App;
