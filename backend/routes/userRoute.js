// this routes forlder provides you a link for the execution of a code which has been done in controller
const express = require("express");
const { registerUser, loginUser, logout, getUserDetails } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/register").post(registerUser);
//now this post method and its url is attached to userAction of frontend and it gets linked with frontend also need to set the proxy as localhost:4000 in config file then it will be connected

router.route("/login").post(loginUser); //on this route the success or response is given in jwttoken file and it is called in usercontroller by sendToken function

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;