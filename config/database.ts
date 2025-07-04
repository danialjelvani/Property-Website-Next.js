// npm i mongodb mongoose

import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (connected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI2!);
    connected = true;
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
