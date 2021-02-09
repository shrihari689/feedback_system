import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import LoginNavBar from "../login/LoginNavBar";

const WrongMail = ({ user }) => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => {})
      .catch((err) => {
        alert("Error in Logging out!");
      });
  };

  return (
    <React.Fragment>
      <LoginNavBar />
      <main className="alert">
        <i className="fa fa-warning"></i> You have logged in as{" "}
        <strong>{user.email}</strong>!
      </main>
      <section className="wrongEmailContainer">
        <h3>Kindly login with your Institution Email ID!</h3>
        <button onClick={handleLogout} className="nav-button">
          Log out
        </button>
      </section>
    </React.Fragment>
  );
};

export default WrongMail;
