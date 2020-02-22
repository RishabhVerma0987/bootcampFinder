const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const conncetDB = require("./config/db.js");

//config path
dotenv.config({ path: "./config/config.env" });

//Routes import
const bootcamps = require("./routes/bootcamps.js");

//define main route & middleware
app.use(morgan("dev"));
app.use("/api/v1/bootcamps", bootcamps);
conncetDB();

//port declaration and port listen
const port = process.env.PORT || 8000;
const server = app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT:${port}`)
);

process.on("unhandledRejection", (err, promisee) => {
  console.log(`Error : ${err.message}`);
  server.close(() => process.exit(1));
});
