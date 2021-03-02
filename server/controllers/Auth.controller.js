const asyncHandler = require("../middlewares/async.middleware");
const nodemailer = require("../services/nodemailer.service");
const createError = require("../utils/createError");
const headers = require("../middlewares/headers.middleware");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cron = require("node-cron");


/* REGISTER USER */
exports.registerUser = asyncHandler(async (req, res, next) => {
  var uuid = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var characterLength = characters.length;
  for (let i = 0; i < 6; i++) {
    uuid += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  const newUser = await User.create({ ...req.body, uid: uuid });
  try {
    await nodemailer
      .sendEmail(newUser.email, "signup", null, newUser.name, uuid)
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "Account Activation Link Sent To Your Mail",
        });
      });
    var job = cron.schedule(
      "59 * * * *",
      async () => {
        try {
          const user1 = await User.findOne({ email: newUser.email });
          if (user1.verify === false) {
            try {
              await User.findOneAndDelete({
                email: user1.email,
              });
            } catch (er) {
              console.log(er);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      { scheduled: false }
    );
    job.start();
    res.status(200).json({
      status: "success",
      message: "Verification Code sent to your email.",
    });
  } catch (err) {
    console.log(err);
    throw errorHandler(500, "Verification email cound't be sent");
  }
  // sendTokenResponse(newUser, 200, res);
});


/* LOGIN USER */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    // verify: true,
  }).select("+password");
  if (!user) throw createError(401, "Email doesn't match");
  const isPassword = await user.matchPassword(req.body.password);
  if (!isPassword) throw createError(401, "Password doesn't match");
  sendTokenResponse(user, 200, res);
});


/* VERIFY EMAIL */
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    uid: req.body.verificationCode,
  });
  if (!user) throw createError(401, "invalid verification code");
  if (user.verify)
    throw createError(401, "You Have already verified Login to continue");
  user.verify = true;
  await user.save({ validateBeforeSave: false });
  sendTokenResponse(user, 200, res);
});


/* UPDATE USER */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const newDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  const editDetails = await User.findByIdAndUpdate(req.user._id, newDetails, {
    new: true,
    runValidators: true,
  });
  const updateDetails = await User.findById(req.body._id);
  res.status(200).send({ status: "success", data: updateDetails });
});


/* UPDATE PASSWORD */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch)
    throw createError(
      400,
      `Current password ${req.body.currentPassword} doesn't Match`
    );
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});


/* FORGOT PASSWORD */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    throw createError(400, `user with ${req.body.email} is not found!`);
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  try {
    const resetUrl = `http://localhost:9090/resetPassword/?token=${resetToken}`;
    await nodemailer
      .sendEmail(req.body.email, "forgotPassword", null, resetUrl, null)
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "forgot password Link Sent To Your Mail",
        });
      });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw createError(500, "Email cound't be sent");
  }
});


/* RESET PASSWORD */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) throw createError(400, `invalid token ${resetToken}`);
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res
    .status(200)
    .send({ status: "success", message: "Your Password has beed changed" });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.genAuthToken();
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    verify: user.verify,
  };
  res.status(statusCode).send({ status: "success", token, authData: userData });
};
