import { Router } from "express";
import {
  createDayController,
  fetchDayController,
} from "../controllers/attendance.controller";
import { requireAuth } from "@clerk/express";

const attendanceRoutes = Router();

attendanceRoutes.post("/create-day", createDayController);
attendanceRoutes.get("/day/:date", requireAuth(), fetchDayController);

export default attendanceRoutes;
