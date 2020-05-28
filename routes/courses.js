const express = require("express");
const { protectRoute } = require("../middleware/auth.js");
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
  .post(protectRoute, addCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .put(protectRoute, updateCourse)
  .delete(protectRoute, deleteCourse);

module.exports = router;
