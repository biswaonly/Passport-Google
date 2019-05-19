const mongoose = require("mongoose");
const config = require("config");

const db = config.get("dbURI");

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log("Connect with DataBase");
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
