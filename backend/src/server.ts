import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./lib/connectDB";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const startServer = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
};

startServer();
