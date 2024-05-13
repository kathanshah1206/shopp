import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login to access", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(` ${req.user.role} is not allowed to access`, 403)
      );
    }

    next();
  };
};
export { isAuthenticatedUser, authorizeRoles };
