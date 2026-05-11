import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
  deleteAllNotificatonController,
  fetchAllNotificatonController,
} from "../controllers/notification.controller";

const notificationRoutes = Router();

notificationRoutes.get("/", requireAuth(), fetchAllNotificatonController);
notificationRoutes.delete("/", requireAuth(), deleteAllNotificatonController);

export default notificationRoutes;
