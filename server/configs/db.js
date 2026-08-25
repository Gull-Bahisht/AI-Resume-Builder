import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;

    console.log("MongoDB URI loaded:", !!mongodbURI);
    console.log("MongoDB URI starts with:", mongodbURI?.substring(0, 20));

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    await mongoose.connect(mongodbURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB error name:", error.name);
    console.error("MongoDB error message:", error.message);

    throw error;
  }
};

export default connectDB;