import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      process.env.MONGO_URL,
      { dbName: "ImageGeneration" }
    )
    .then(() => console.log("Database Connnected"))
    .catch(err => console.log(err));
};
