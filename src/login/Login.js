import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const getItems = JSON.parse(localStorage.getItem("user"));

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Email === "" || Password === "") {
      message.error("Email and Password are required.");
      return;
    }
    if (Email === getItems?.Email && Password === getItems.Password) {
      message.success("Login successfully");
      navigate("/homepage");
      return;
    } else {
      message.error("Invalid Email Or Password");
      return;
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-container">
          <h1>Login</h1>
          <form>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                placeholder="Enter your username"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="eye-icon" onClick={handleTogglePassword}>
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
              </div>
            </div>

            <div className="button-div">
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className="forget">
              <label htmlFor="password">
                Remember Me <a href="/forgot">Forget Password</a>
              </label>
            </div>
            <div className="register">
              <p>
                Don't have an account <a href="/signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
