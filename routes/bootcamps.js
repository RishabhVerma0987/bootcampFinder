const express = require("express");
const {
  getBootcamps,
  getSingleBootcamp,
  updateBookcamp,
  deleteBootcamp,
  createBootcamp,
  findBootcampByLocation,
  uploadPhotoBootcamp,
} = require("../controllers/bootcamps.js");
const courses = require("../routes/courses.js");

//get model and middleware for advance filtering
const Bootcamp = require("../models/Bootcamp.js");
const advanceFiltering = require("../middleware/advanceFiltering.js");

const router = express.Router();

router.use("/:bootcampId/courses", courses);

router
  .route("/")
  .get(advanceFiltering(Bootcamp, "coursesIncludes"), getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBookcamp)
  .delete(deleteBootcamp);

router.route("/:id/photo").put(uploadPhotoBootcamp);

router.route("/radius/:zipcode/:distance").get(findBootcampByLocation);

module.exports = router;
