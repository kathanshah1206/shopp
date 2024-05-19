import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";
import { sendToken } from "../utils/jwtTokenFile.js";
import SendEmail from "../utils/SendEmail.js";
import Product from "../models/productModel.js";
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordurl = `http://localhost:${process.env.PORT}/api/v1/password/reset/${resetToken}`;
  try {
    await SendEmail({
      email: user.email,
      subject: "password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} succesfuully`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  }
});
//get user detail
const getUserDetail = catchAsyncError(async (req, res, next) => {
  try {
    // let user = await User.findById(req.params.id);
    let user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User not found"), 404);
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
const updatePassword = catchAsyncError(async (req, res, next) => {
  try {
    let id = req.user._id;
    const user = await User.findById(id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("old password incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password mismatch", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//for users and admin since users cant change role
const updateUser = catchAsyncError(async (req, res, next) => {
  try {
    let id = req.user._id;
    const user = await User.findById(id);
    Object.keys(req.body).map((e) => {
      if (e != "role") {
        user[e] = req.body[e];
      }
      return e;
    });
    await user.save();
    console.log(user);
    return res.status(200).json({
      success: true,
      message: "data updated successfully",
      data: user,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//for  admin since admin can change role also
const updateUserRole = catchAsyncError(async (req, res, next) => {
  try {
    let id = req.user._id;
    const user = await User.findById(id);
    Object.keys(req.body).map((e) => {
      user[e] = req.body[e];

      return e;
    });
    await user.save();
    console.log(user);
    return res.status(200).json({
      success: true,
      message: "data updated successfully by admin",
      data: user,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//get single user by admibn
const getSingleUser = catchAsyncError(async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User not found"), 404);
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully ny admin",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//get all user bybadmin
const getAllUser = catchAsyncError(async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "data fetcherd successfully by admin",
      data: users,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});
//delete users by admin
const Deleteuser = catchAsyncError(async (req, res, next) => {
  try {
    let result = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "data deleted successfully by admin",
      data: result,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error"), 500);
  }
});

export {
  forgotPassword,
  registerUser,
  loginUser,
  logoutUser,
  getUserDetail,
  updatePassword,
  updateUser,
  getAllUser,
  getSingleUser,
  updateUserRole,
  Deleteuser,
};
