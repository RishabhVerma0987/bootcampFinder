const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  forgetpassword,
  resetpassword,
} = require("../controllers/auth.js");

const router = express.Router();
const { protectRoute } = require("../middleware/auth.js");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getMe);
router.route("/forgetpassword").post(forgetpassword);
router.route("/resetpassword/:resettoken").put(resetpassword);
module.exports = router;
