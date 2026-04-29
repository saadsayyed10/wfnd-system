import { Router } from "express";
import {
  createDayController,
  fetchDayController,
  loginWorkerAttendenceController,
  logoutWorkerAttendenceController,
} from "../controllers/attendance.controller";
import { requireAuth } from "@clerk/express";

const attendanceRoutes = Router();

attendanceRoutes.post("/create-day", createDayController);
attendanceRoutes.get("/day/:date", requireAuth(), fetchDayController);
attendanceRoutes.put(
  "/day/login/:id",
  requireAuth(),
  loginWorkerAttendenceController,
);
attendanceRoutes.put(
  "/day/logout/:id",
  requireAuth(),
  logoutWorkerAttendenceController,
);

export default attendanceRoutes;
