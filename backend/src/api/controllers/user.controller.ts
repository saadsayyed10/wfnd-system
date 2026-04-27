import { Request, Response } from "express";
import { fetchClerkUser, syncClerkUser } from "../services/user.service";
import { AppError } from "../../middleware/error.middleware";
import { getAuth } from "@clerk/express";

export const syncClerkUserController = async (req: Request, res: Response) => {
  const { clerkId, name, email, profilePicture } = req.body;
  const data = { clerkId, name, email };

  if (!data) {
    console.log("Required fields are missing");
    return res.status(404).json({ error: "Required fields are missing" });
  }

  try {
    const user = await syncClerkUser(clerkId, name, email, profilePicture);
    res.status(201).json({ message: "User synced", user });
  } catch (error: any) {
    console.log(error.message);
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 500;
    const message =
      error instanceof AppError ? error.message : "Internal server error";
    return res.status(status).json({ error: message });
  }
};

export const fetchClerkUserController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  try {
    const user = await fetchClerkUser(userId!);
    res.status(200).json({ user });
  } catch (error: any) {
    console.log(error.message);
    console.log("Is AppError:", error instanceof AppError);
    console.log("Error name:", error.constructor.name);
    console.log("Error message:", error.message);
    const status = error instanceof AppError ? error.statusCode : 400;
    const message = error instanceof AppError ? error.message : "Bad request";
    return res.status(status).json({ error: message });
  }
};
