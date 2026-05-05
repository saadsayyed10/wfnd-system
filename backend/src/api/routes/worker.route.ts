import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
  addWorkerController,
  deleteWorkerController,
  fetchAllWorkersController,
  updateWorkerController,
} from "../controllers/worker.controller";

const workerRoutes = Router();

workerRoutes.post("/add", requireAuth(), addWorkerController);
workerRoutes.get("/all", requireAuth(), fetchAllWorkersController);
workerRoutes.put("/update/:id", requireAuth(), updateWorkerController);
workerRoutes.delete("/delete/:id", requireAuth(), deleteWorkerController);

export default workerRoutes;
