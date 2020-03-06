const ErrorHandler = require("../utils/errorHandler.js");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);

  if (err.name == "CastError") {
    error = new ErrorHandler(`Bootcamp not found at id ${err.value}`, 400);
  }

  if (err.code == 11000) {
    error = new ErrorHandler(`Duplicate Fields`, 400);
  }

  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorHandler(`${message}`, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
