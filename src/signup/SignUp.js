import React from "react";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const SignUp = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (Email == "" || Password == "" || ConfirmPassword == "") {
      message.error("Email and Password are required.");
      return;
    }
    if (Password !== ConfirmPassword) {
      message.error("Password Does Not Match.");
      return;
    }
    const userData = {
      name: Name,
      Email: Email,
      Password: Password,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    message.success("Registered successfully");
    navigate("/login");
    return;
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>SignUp</h1>
        <form>
          <div className="input-container">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="username"
              className="email-input"
              placeholder="Enter your username"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              placeholder="Enter your email"
              className="password-input"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="password-input"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Confirm-Password</label>
            <input
              type="password"
              name="password"
              className="password-input"
              placeholder="Enter your confirm-password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-div">
            <button type="submit" onClick={HandleSubmit}>
              Submit
            </button>
          </div>
          <div className="register">
            <p>
              Already Had An Account {""}
              <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
