const express = require("express");
const dotenv = require("dotenv");
const app = express();

//config path
dotenv.config({ path: "./config/config.env" });

//Routes import
const bootcamps = require("./routes/bootcamps.js");

//define main route
app.use("/api/v1/bootcamps", bootcamps);

//port declaration and port listen
const port = process.env.PORT || 8000;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT:${port}`)
);
