const ErrorHandler = require("../utils/errorHandler.js");
const coursesModel = require("../models/Course.js");
/**
 * @description get a courses belonging to a certain bootcamp if that bootcamp id is provided if not then give all courses
 * @param route GET /api/v1/courses
 * @param route GET /api/v1/bootcamps/:bootcampId/courses
 * @param access PUBLIC
 */
exports.getCourses = async (req, res, next) => {
  try {
    let query;
    if (req.params.bootcampId) {
      query = coursesModel.find({ bootcamp: req.params.bootcampId });
    } else {
      query = coursesModel.find().populate({
        path: "bootcamp",
        select: "name description averageCost",
      });
    }

    const courses = await query;

    res.status(200).json({
      sucess: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};
