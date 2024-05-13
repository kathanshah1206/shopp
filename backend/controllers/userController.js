import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";
import { sendToken } from "../utils/jwtTokenFile.js";

const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample od",
      url: "profile-pic",
    },
  });
  //   const token = user.getJWTToken();
  //   res.status(201).json({
  //     success: true,
  //     user,
  //     token,
  //   });
  sendToken(user, 201, res);
});
//login user
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please Enter both email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("No user found..please register and LOGIN again !", 404)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or password.", 401));
  }
  //   const token = user.getJWTToken();
  //   res.status(200).json({
  //     success: true,
  //     user,
  //     token,
  //   });
  sendToken(user, 200, res);
});
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne(req.body.email);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordurl = `http://localhost:${process.env.PORT}/api/v1/password/reset`;
});

export { forgotPassword, registerUser, loginUser, logoutUser };
