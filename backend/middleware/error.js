import ErrorHandler from "../utils/errorhandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({
    success: false,
    error: err,
  });
};

export default errorMiddleware;
