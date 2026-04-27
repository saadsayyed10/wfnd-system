import { Router } from "express";
import { syncClerkUserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/sync", syncClerkUserController);

export default userRoutes;
