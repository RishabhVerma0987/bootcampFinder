const ErrorHandler = require("../utils/errorHandler.js");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  if (err.name == "CastError") {
    error = new ErrorHandler(`Bootcamp not found at id ${err.value}`);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
