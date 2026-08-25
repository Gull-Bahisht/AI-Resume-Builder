import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import dns from "dns";
import userRouter from "./routes/userRoures.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

const app = express();

const PORT = process.env.PORT || 3000;

console.log("Starting server...");

//database connection
await connectDB()

console.log("Database connection finished");

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>res.send("Server is live!"))

app.use('/api/users',userRouter)

app.use('/api/resumes',resumeRouter)

app.use('/api/ai',aiRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
