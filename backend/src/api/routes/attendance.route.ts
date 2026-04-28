import { requireAuth } from "@clerk/express";
import { Router } from "express";
import { loginUserController } from "../controllers/attendance.controller";

const attendanceRoutes = Router();

attendanceRoutes.post("/login", requireAuth(), loginUserController);

export default attendanceRoutes;
