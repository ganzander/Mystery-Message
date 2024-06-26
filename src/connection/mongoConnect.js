import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

mongoose
  .connect(MONGODB_URI)
  .then(console.log("mongoDB connected successful"))
  .catch((err) => {
    console.log("some error in db connection");
    console.log(err);
  });

module.exports = mongoose.connection;
