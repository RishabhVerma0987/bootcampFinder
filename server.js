const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");

//config path
dotenv.config({ path: "./config/config.env" });

//Routes import
const bootcamps = require("./routes/bootcamps.js");

//define main route & middleware
app.use("/api/v1/bootcamps", bootcamps);
app.use(morgan("dev"));

//port declaration and port listen
const port = process.env.PORT || 8000;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT:${port}`)
);
