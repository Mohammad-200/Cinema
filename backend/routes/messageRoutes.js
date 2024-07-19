const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageControllers");
const { authCheck } = require("../middleware/authCheck");
const router = express.Router();

router.route("/chat").post(authCheck, sendMessage).get(authCheck, getMessages);

module.exports = router;
