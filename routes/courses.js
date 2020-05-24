const express = require("express");

const {
  getCourses,
  getSingleCourse,
  addCourse,
} = require("../controllers/courses.js");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getSingleCourse);

module.exports = router;
