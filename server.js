const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/config.env" });

const port = process.env.PORT || 8000;

//show all bootcamps
app.get("/api/V1/bootcamps", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: "show all bootcamps"
  });
});

//get a single bootcamp
app.get("/api/V1/bootcamps/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `show bootcamp ${req.params.id}`
  });
});

//create new bootcamp
app.post("/api/V1/bootcamps", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: "create new bootcamp"
  });
});
//update a bootcamps
app.put("/api/V1/bootcamps/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `update bootcamp ${req.params.id}`
  });
});
//delete a bootcamps
app.delete("/api/V1/bootcamps/:id", (req, res) => {
  res.status(200).send({
    sucess: true,
    body: `delete bootcamp ${req.params.id}`
  });
});

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT:${port}`)
);
