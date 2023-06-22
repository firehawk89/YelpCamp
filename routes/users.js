const express = require("express");
const router = express.Router();
const passport = require("passport");

const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");
const catchAsyncError = require("../utils/catchAsyncError");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsyncError(users.registerUser));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
