const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCheck = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // to cut the Bearer word from the token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please sign up fist to access the public chat" });
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res
          .status(403)
          .json({ message: "Please sign up first to access the public chat" });
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          req.user = user;
          next();
        } catch (error) {
          console.log(error.message);
          res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { authCheck };
