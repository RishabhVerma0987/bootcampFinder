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
const { protectRoute, authorize } = require("../middleware/auth.js");

const router = express.Router();

router.use("/:bootcampId/courses", courses);

router
  .route("/")
  .get(advanceFiltering(Bootcamp, "coursesIncludes"), getBootcamps)
  .post(protectRoute, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(protectRoute, authorize("publisher", "admin"), updateBookcamp)
  .delete(protectRoute, authorize("publisher", "admin"), deleteBootcamp);

router
  .route("/:id/photo")
  .put(protectRoute, authorize("publisher", "admin"), uploadPhotoBootcamp);

router.route("/radius/:zipcode/:distance").get(findBootcampByLocation);

module.exports = router;
