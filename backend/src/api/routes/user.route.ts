import { Router } from "express";
import {
  fetchClerkUserController,
  syncClerkUserController,
} from "../controllers/user.controller";
import { requireAuth } from "@clerk/express";

const userRoutes = Router();

userRoutes.post("/sync", syncClerkUserController);

userRoutes.get("/profile", requireAuth(), fetchClerkUserController);

export default userRoutes;
