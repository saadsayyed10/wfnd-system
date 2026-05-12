import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import {
  deleteAllNotifications,
  fetchAllNotifications,
} from "../services/notification.service";

export const fetchAllNotificatonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log(
        "Unauthorized: User must be logged in to fetch all notifications",
      );
      return res.status(401).json({
        error:
          "Unauthorized: User must be logged in to fetch all notifications",
      });
    }

    const notifications = await fetchAllNotifications();
    return res.status(200).json({ total: notifications.length, notifications });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAllNotificatonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log(
        "Unauthorized: User must be logged in to fetch all notifications",
      );
      return res.status(401).json({
        error:
          "Unauthorized: User must be logged in to fetch all notifications",
      });
    }

    await deleteAllNotifications();
    return res.status(204).json({ message: "All notifications deleted" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
