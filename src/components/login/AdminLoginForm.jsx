import React, { useState } from "react";
import "./../../adminForm.css";
import Loader from './../general/loadingPage';

const AdminLoginForm = ({isLoading, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    if (!email) {
      alert("Email is Required!");
      return;
    }
    if (!password) {
      alert("Password is Required!");
      return;
    }
    if (password && password.length < 8) {
      alert("Password must be more than 8 characters!");
      return;
    }
    onLogin(email, password);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="adminFormContainer">
      <h2>Admin Login</h2>
      <div className="inputGroup">
        <label htmlFor="adminLoginEmail">Email ID</label>
        <input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value.trim())}
          id="adminLoginEmail"
          pattern=".*@bitsathy.ac.in$"
          placeholder="Admin Email ID"
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="adminLoginPassword">Password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="adminLoginPassword"
          placeholder="Admin Password"
        />
      </div>
      <div className="inputGroup">
        <input onClick={handleLogin} type="submit" value="Login" />
      </div>
    </div>
  );
};

export default AdminLoginForm;
