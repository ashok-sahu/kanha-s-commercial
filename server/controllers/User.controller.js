const User = require("../models/User.model");
const createError = require("../middlewares/error.middleware");
const asyncHandler = require("../middlewares/async.middleware");


exports.getusers = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});


exports.getuser = asyncHandler(async () => {
  const user = await User.findById(req.params.id);
  if (!user)
    throw createError(404, `User is not found with the id of ${req.params.id}`);
  res.status(200).send({
    status: "success",
    data: user,
  });
});


exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).send({
    status: "success",
    data: user,
  });
});


exports.updateuser = asyncHandler(async (req, res, next) => {
  const edituser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!edituser)
    throw createError(404, `User is not found with id of ${req.params.id}`);
  res.status(201).send({
    status: "success",
    data: edituser,
  });
});


exports.deleteUser = asyncHandler(async (req, res, next) => {
  const deleteUser = await User.findById(req.params.id);
  if (!deleteUser)
    throw createError(404, `User is not found with id of ${req.params.id}`);
  await deleteUser.remove();
  res.status(204).send({
    status: "success",
    message: "User Deleted Successfully",
  });
});
