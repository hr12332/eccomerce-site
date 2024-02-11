import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
const Forgot = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("user"));
    if (getItems) {
      setName(getItems.name || "");
      setEmail(getItems.Email || "");
      setPassword(getItems.Password || "");
      setConfirmPassword(getItems.Password || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == "" || confirmPassword == "") {
      message.error("Password and ConfirmPassword are required.");
      return;
    }
    const user = { name: name, Email: email, Password: password };
    localStorage.setItem("user", JSON.stringify(user));
    message.success("Password changed successfully");
    navigate("/login");
    return;
  };
  return (
    <div className="container">
      <div className="login-container">
        <h1>Change Password</h1>
        <form>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="username"
              type="password"
              name="username"
              className="email-input"
              placeholder="Enter your username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password"> Confirm Password</label>
            <input
              type="password"
              id="password"
              name="username"
              placeholder="Enter your email"
              className="password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="button-div">
            <button type="submit" onClick={handleSubmit}>
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

export default Forgot;
