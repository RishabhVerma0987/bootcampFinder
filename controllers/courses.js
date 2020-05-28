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
    if (req.params.bootcampId) {
      const courses = await coursesModel.find({
        bootcamp: req.params.bootcampId,
      });
      res.status(200).json({
        sucess: true,
        count: courses.length,
        data: courses,
      });
    } else {
      res.status(200).json(res.advanceResults);
    }
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
    const bootcamp = await bootcampModel.findById(req.params.bootcampId);
    if (!bootcamp) {
      return next(
        new ErrorHandler(`Bootcamp not present at ${req.params.bootcampId}`),
        400
      );
    }
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;
    //make sure the user is owner
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to create this course in this bootcamp`,
          401
        )
      );
    }
    const course = await coursesModel.create(req.body);

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description update Course by Id
 * @param route PUT /api/v1/courses/:id
 * @param access PRIVATE
 */
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await coursesModel.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorHandler(`Course not found at id ${req.params.id}`, 404)
      );
    }
    //make sure the user is owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to update this course in this bootcamp`,
          401
        )
      );
    }
    course = await coursesModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description delete Course by Id
 * @param route DELETE /api/v1/courses/:id
 * @param access PRIVATE
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await coursesModel.findById(req.params.id);
    if (!course) {
      return next(
        new ErrorHandler(`Course not found at id ${req.params.id}`),
        400
      );
    }
    //make sure the user is owner
    if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorHandler(
          `User ${req.user.id} is not authorised to delete this course in this bootcamp`,
          401
        )
      );
    }
    await course.remove();

    res.status(200).json({
      sucess: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
