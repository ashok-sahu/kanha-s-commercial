const router = require("express").Router();
const {
  getuser,
  getusers,
  deleteUser,
  updateuser,
  createUser,
} = require("../controllers/User.controller");

const advancedResults = require("../middlewares/advancedResult.middleware");
const { protect, permission } = require("../middlewares/auth.middleware");
const User = require("../models/User.model");

router.use(protect);
router.use(permission("admin"));
router
  .get("/", advancedResults(User), getusers)
  .get("/:id", getuser)
  .post("/", createUser)
  .put("/:id", updateuser)
  .delete("/:id", deleteUser);

module.exports = router;
