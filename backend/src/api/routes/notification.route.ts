import { requireAuth } from "@clerk/express";
import { Router } from "express";
import {
  deleteAllNotificatonController,
  fetchAllNotificatonController,
} from "../controllers/notification.controller";

const notificationRouter = Router();

notificationRouter.get("/", requireAuth(), fetchAllNotificatonController);
notificationRouter.delete("/", requireAuth(), deleteAllNotificatonController);

export default notificationRouter;
