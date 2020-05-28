const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//load model schema
const BootcampModel = require("./models/Bootcamp.js");
const CourseModel = require("./models/Course.js");
const UserModel = require("./models/User.js");

//connectToDB
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//readJsonFile
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

//Populate database
const ImportData = async () => {
  try {
    await BootcampModel.create(bootcamp);
    await CourseModel.create(course);
    await UserModel.create(user);
    console.log(`Data Imported `.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete everything from database
const DeleteData = async () => {
  try {
    await BootcampModel.deleteMany();
    await CourseModel.deleteMany();
    await UserModel.deleteMany();
    console.log("Data Deleted".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//args setup CLI

if (process.argv[2] === ("-i" || "-import")) {
  ImportData();
} else if (process.argv[2] === ("-d" || "-delete")) {
  DeleteData();
}
