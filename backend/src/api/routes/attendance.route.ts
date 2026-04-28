import { Router } from "express";
import { createDayController } from "../controllers/attendance.controller";

const attendanceRoutes = Router();

attendanceRoutes.post("/create-day", createDayController);

export default attendanceRoutes;
