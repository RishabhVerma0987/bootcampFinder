const express = require("express");
const {
  getBootcamps,
  getSingleBootcamp,
  updateBookcamp,
  deleteBootcamp,
  createBootcamp
} = require("../controllers/bootcamps.js");

const router = express.Router();

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBookcamp)
  .delete(deleteBootcamp);

module.exports = router;
