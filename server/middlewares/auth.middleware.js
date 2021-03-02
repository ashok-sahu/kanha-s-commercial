const User = require("../models/User.model");
const asyncHandler = require("../middlewares/async.middleware");
const errorHandler = require("../utils/createError");
const verifyToken = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!(authorization && authorization.toLowerCase().startsWith("bearer")))
    throw errorHandler(401, "not authorized!");
  const token = authorization.split(" ")[1];
  const decodeToken = verifyToken(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeToken._id);
  next();
});

const permission = (role) => (req, res, next) => {
  if (role !== req.user.role)
    throw errorHandler(
      401,
      `User role ${req.user.role} is not allowed to access this resource`
    );

  next();
};
module.exports = { protect, permission };
