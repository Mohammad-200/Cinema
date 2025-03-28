import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import BackToMainScreen from "../components/BackToMainScreen";

const ENDPOINT = "https://cinema-backend-32dr.onrender.com";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ENDPOINT}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
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

    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <BackToMainScreen />
      <div className="signup-content">
        <h1>
          Welcome to the <span id="cinema">Cinema</span>
        </h1>
        <div className="signup-header">
          <p>Sign up</p>
          <p>
            Already signed? <Link to="/login">Login</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>UserName*</label>
          <input
            type="text"
            className="input-style"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <p className="userName error">{errors.userName}</p>
          <label>Email*</label>
          <input
            type="email"
            className="input-style"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p className="email error">{errors.email}</p>
          <label>Password*</label>
          <input
            type="password"
            className="input-style"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p className="password error">{errors.password}</p>
          <button className="signup-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
