const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/config.env" });

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("<h2>SUCESS</h2>");
});

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT:${port}`)
);
