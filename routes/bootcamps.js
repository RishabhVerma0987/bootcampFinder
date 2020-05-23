const express = require("express");
const {
  getBootcamps,
  getSingleBootcamp,
  updateBookcamp,
  deleteBootcamp,
  createBootcamp,
  findBootcampByLocation,
} = require("../controllers/bootcamps.js");
const courses = require("../routes/courses.js");

const router = express.Router();

router.use("/:bootcampId/courses", courses);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBookcamp)
  .delete(deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(findBootcampByLocation);

module.exports = router;
