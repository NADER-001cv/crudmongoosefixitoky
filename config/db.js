const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });


const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("DataBase Connected !");
  } catch (error) {
    console.log(error.messasge);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
