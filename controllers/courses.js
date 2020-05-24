const ErrorHandler = require("../utils/errorHandler.js");
const coursesModel = require("../models/Course.js");
const bootcampModel = require("../models/Bootcamp.js");
/**
 * @description get a courses belonging to a certain bootcamp if that bootcamp id is provided if not then give all courses
 * @param route GET /api/v1/courses
 * @param route GET /api/v1/bootcamps/:bootcampId/courses //get all courses in present in the bootcamp
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
/**
 * @description get a single course
 * @param route GET /api/v1/courses/:id
 * @param access PUBLIC
 */
exports.getSingleCourse = async (req, res, next) => {
  try {
    const course = await coursesModel.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description averageCost",
    });

    if (!course) {
      next(new ErrorHandler(`Course not found at Id ${req.params.id}`), 400);
    }

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description add a new course
 * @param route POST /api/v1/bootcamps/:bootcampId/courses
 * @param access PRIVATE
 */
exports.addCourse = async (req, res, next) => {
  try {
    console.log("it ran");
    const bootcamp = await bootcampModel.findById(req.params.bootcampId);
    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not present at ${req.params.bootcampId}`),
        400
      );
    }
    req.body.bootcamp = req.params.bootcampId;

    const course = await coursesModel.create(req.body);

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
