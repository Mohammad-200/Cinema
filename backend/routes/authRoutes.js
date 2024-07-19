const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router
  .route("/signup")
  .get(authController.signup_get)
  .post(authController.signup_post);

router
  .route("/login")
  .get(authController.login_get)
  .post(authController.login_post);

module.exports = router;
