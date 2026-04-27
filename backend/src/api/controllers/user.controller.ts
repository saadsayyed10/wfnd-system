import { Request, Response } from "express";
import { syncClerkUser } from "../services/user.service";

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
    return res.status(500).json({ error: error.message });
  }
};
