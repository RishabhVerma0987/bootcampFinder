const ErrorHandler = require("../utils/errorHandler.js");

/**
 * @description register user
 * @param route POST /api/v1/auth/register
 * @param access PRIVATE
 */
exports.registerUser = async (req, res, next) => {
  try {
    res.status(200).json({
      sucess: true,
    });
  } catch (error) {
    next(error);
  }
};
