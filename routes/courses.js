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
const { protectRoute, authorize } = require("../middleware/auth.js");

router
  .route("/")
  .get(advanceFiltering(course, "bootcamp"), getCourses)
  .post(protectRoute, authorize("publisher", "admin"), addCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .put(protectRoute, authorize("publisher", "admin"), updateCourse)
  .delete(protectRoute, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
