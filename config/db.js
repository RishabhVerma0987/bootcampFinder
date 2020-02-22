const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`Database Connected to ${conn.connection.host}`);
};

module.exports = connectDB;
