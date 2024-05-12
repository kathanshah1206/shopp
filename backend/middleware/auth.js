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
export { isAuthenticatedUser };
