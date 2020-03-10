const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//load model schema
const BootcampModel = require("./models/Bootcamp.js");

//connectToDB
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//readJsonFile
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Populate database
const ImportData = async () => {
  try {
    await BootcampModel.create(bootcamp);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete everything from database
const DeleteData = async () => {
  try {
    await BootcampModel.deleteMany();
    console.log("Data Deleted".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//args setup CLI

if (process.argv[2] == "-import") {
  ImportData();
} else if (process.argv[2] == "-delete") {
  DeleteData();
}