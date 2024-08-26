import mongoose from "mongoose";

const conectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_DB}`);
    console.log("Connecting to Mongo Successfully");
  } catch (error) {
    console.log("connect DB failed ", error);
  }
};

export default conectDB;
