// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () => {
//       console.log("Database connected successfully");
//     });

//     let mongodbURI = process.env.MONGODB_URI;

//     const projectName = "resume-builder";

//     if (!mongodbURI) {
//       throw new Error("MONGODB_URI env variable not set");
//     }

//     if (mongodbURI.endsWith("/")) {
//       mongodbURI = mongodbURI.slice(0, -1);
//     }

//     await mongoose.connect(`${mongodbURI}/resume-builder`);
//   } catch (error) {
//     console.error("Error connecting to mongodb:", error);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;

    console.log("URI loaded:", !!mongodbURI);
    console.log("URI starts with:", mongodbURI?.substring(0, 20));

    await mongoose.connect(`${mongodbURI}/resume-builder`, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB error name:", error.name);
    console.error("MongoDB error message:", error.message);
  }
};

export default connectDB;
