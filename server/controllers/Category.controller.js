const errorHandler = require("../utils/createError");
const asyncHandler = require("../middlewares/async.middleware");
const Category = require("../models/Category.model");

exports.addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).send({
    status: "success",
    data: category,
  });
});


exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: req.advanceResults });
});


exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    throw errorHandler(
      404,
      `category with id of ${req.params._categoryId} is not found`
    );
  }
  res.status(200).send({ status: "success", data: category });
});


exports.updateCategory = asyncHandler(async (req, res, next) => {
  const editCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!editCategory) {
    throw errorHandler(
      400,
      `category with id ${req.params.categoryId} is not found`
    );
  }
  const updatedCategory = await category.findById(req.params.categoryId);
  res.status(200).send({ status: "success", data: updatedCategory });
});


exports.removeCategory = asyncHandler(async (req, res, next) => {
  const findCategory = await Category.findByIdAndDelete(req.params.categoryId);
  if (!findCategory) {
    throw errorHandler(
      404,
      `category with id ${req.params.categoryId} is not found!`
    );
  }

  res
    .status(200)
    .send({ status: "success", message: "category deleted successfully" });
});
