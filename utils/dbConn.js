const { mongo_creds } = require("../configs/creds");
const mongoose = require("mongoose");

require("../configs/creds");
const connectDB = async () => {
  await mongoose.connect(
    mongo_creds.mongoUrl,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  console.log("Mongo connected");
};


module.exports = connectDB;
