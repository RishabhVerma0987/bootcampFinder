const ErrorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User.js");

exports.protectRoute = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //make sure token exits
  if (!token) {
    return next(new ErrorHandler("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Not authorized to access this route", 401));
  }
};
