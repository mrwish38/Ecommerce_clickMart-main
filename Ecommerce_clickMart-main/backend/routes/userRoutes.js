const express = require("express");
const {userSignup, userLogin, userLogout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers} = require("../controllers/userController");
const { isUserAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/signup").post(userSignup);

router.route("/login").post(userLogin);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(userLogout);

router.route("/me").get(isUserAuthenticated, getUserDetails);

router.route("/password/update").put(isUserAuthenticated, updatePassword);

router.route("/me/update").put(isUserAuthenticated, updateProfile);

router.route("/admin/users").get(isUserAuthenticated, getAllUsers);

module.exports = router;