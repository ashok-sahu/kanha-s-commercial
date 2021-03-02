const router = require("express").Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/Auth.controller");
const { protect } = require("../middlewares/auth.middleware");
router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/verifyEmail", verifyEmail)
  .post("/forgotPassword", forgotPassword)
  .post("/resetPassword", resetPassword)
  .put("/update/userDetails", protect, updateUser)
  .put("/update/password", protect, updatePassword);

module.exports = router;
