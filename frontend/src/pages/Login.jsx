import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import BackToMainScreen from "../components/BackToMainScreen";

const ENDPOINT = "https://cinema-backend-32dr.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      if (data.user && data.token) {
        localStorage.setItem("userInfo", data.token);
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  const handleGuestLogin = async () => {
    setEmail("guest@gmail.com");
    setPassword("guest12345");

    try {
      const response = await fetch(`${ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "guest@gmail.com",
          password: "guest12345",
        }),
      });
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
        return;
      }
      if (data.user && data.token) {
        localStorage.setItem("userInfo", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <BackToMainScreen />
      <div className="login-content">
        <h1>
          Welcome Back to <span id="cinema">Cinema</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label>Email*</label>
          <input
            type="email"
            className="input-style"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <p className="emailError error">{errors.email}</p>
          <label>Password*</label>
          <input
            type="password"
            className="input-style"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <p className="passwordError error">{errors.password}</p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="guest-container">
          <button className="guest-login-btn" onClick={handleGuestLogin}>
            Continue as a Guest
          </button>
        </div>
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
