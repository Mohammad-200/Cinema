require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (error) => {
  // console.log(error.message, error.code);
  const errors = { userName: "", email: "", password: "" };

  if (error.message.includes("user validation failed")) {
    // optional check
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (
    error.message.includes("duplicate key error collection") &&
    error.message.includes("userName")
  ) {
    // Duplicate userName error
    return { ...errors, userName: "Invalid user, please try another one" };
  }

  if (
    error.message.includes("duplicate key error collection") &&
    error.message.includes("email")
  ) {
    // Duplicate email error
    return { ...errors, email: "This email is already registered" };
  }

  //errors for login
  if (error.message === "incorrect password") {
    return { ...errors, password: "The password is incorrect" };
  }
  if (error.message === "incorrect email") {
    return { ...errors, email: "This email is not registered" };
  }

  return errors;
};

// create JWT cookie

// const maxAge = 3 * 242 * 60 * 60;
const maxAge = 24 * 60 * 60; // 1 day in seconds

const createToken = (user) => {
  const payload = {
    id: user._id,
    userName: user.userName,
    pic: user.pic,
  };

  return jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  console.log("The user trying to SIGNUP", req.body);
  res.json({ message: "Trying to signup" });
};

// pushing the user to the DB
const signup_post = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.create({ userName, email, password });
    const token = createToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const login_get = (req, res) => {
  console.log("The user trying to LOGIN", req.body);
  res.json({ message: "Trying to LOGIN" });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
