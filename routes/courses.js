const express = require("express");

const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.js");

const router = express.Router({ mergeParams: true });
//get middleware and model for advance filtering
const course = require("../models/Course.js");
const advanceFiltering = require("../middleware/advanceFiltering.js");

router
  .route("/")
  .get(advanceFiltering(course, "bootcamp"), getCourses)
  .post(addCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
