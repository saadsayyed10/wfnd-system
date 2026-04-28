import { Router } from "express";
import {
  createDayController,
  fetchDayController,
} from "../controllers/attendance.controller";

const attendanceRoutes = Router();

attendanceRoutes.post("/create-day", createDayController);
attendanceRoutes.get("/day", fetchDayController);

export default attendanceRoutes;
