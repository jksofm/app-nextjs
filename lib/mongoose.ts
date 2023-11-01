import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.DB_PASSWORD) return console.log("MONGODB_URL not found");

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@threads.wy8wjkf.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Already connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
