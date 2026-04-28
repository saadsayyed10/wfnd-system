import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./lib/connectDB";
import userRoutes from "./api/routes/user.route";
import { clerkMiddleware } from "@clerk/express";
import workerRoutes from "./api/routes/worker.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use("/api/users", userRoutes);
app.use("/api/workers", workerRoutes);

const startServer = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
};

startServer();
