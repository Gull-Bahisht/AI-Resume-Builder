import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import dns from "dns";
import userRouter from "./routes/userRoures.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

connectDB();

export default app;