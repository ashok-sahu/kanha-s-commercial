const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/Category.controller");

const advanceResults = require("../middlewares/advancedResult.middleware");
const { protect, permission } = require("../middlewares/auth.middleware");
const Category = require("../models/Category.model");

router
  .get("/", advanceResults(Category), getCategories)
  .get("/:categoryId", getCategory)
  .post("/", protect, permission("admin"), addCategory)
  .put("/:categoryId", protect, permission("admin"), updateCategory)
  .delete("/:categoryId", protect, permission("admin"), removeCategory);

module.exports = router;
