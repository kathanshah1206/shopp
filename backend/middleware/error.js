import ErrorHandler from "../utils/errorhandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name == "CastError") {
    const msg = `Resourece not Found.Invalid ${err.path}`;
    err = new ErrorHandler(msg, 400);
  }
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name == "JsonWebTokenError") {
    const message = `Resourece not found.ERrroro ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name == "TokenExpiredError") {
    const message = `token expired.try agaim`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
