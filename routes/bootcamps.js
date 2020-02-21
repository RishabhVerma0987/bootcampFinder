const express = require("express");

const router = express.Router();

//show all bootcamps
router.get("/", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: "show all bootcamps"
  });
});

//get a single bootcamp
router.get("/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `show bootcamp ${req.params.id}`
  });
});

//create new bootcamp
router.post("/", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: "create new bootcamp"
  });
});
//update a bootcamps
router.put("/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `update bootcamp ${req.params.id}`
  });
});
//delete a bootcamps
router.delete("/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `delete bootcamp ${req.params.id}`
  });
});

module.exports = router;
