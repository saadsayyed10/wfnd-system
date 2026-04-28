import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { loginUser } from "../services/attendance.service";

export const loginUserController = async (req: Request, res: Response) => {
  const { workerId } = req.params;
  const { login } = req.body;

  if (!workerId) {
    console.log("Worker ID not found in params");
    return res.status(404).json({ error: "Worker ID not found in params" });
  }

  if (!login) {
    console.log("Please enter time to login");
    return res.status(404).json({ error: "Please enter time to login" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log(
        "Unauthorized: Please login to mark attendance of the worker",
      );
      return res.status(404).json({
        error: "Unauthorized: Please login to mark attendance of the worker",
      });
    }

    const attendance = await loginUser(workerId.toString(), login);
    console.log(`New login at ${attendance.login}`);
    res.status(201).json({ message: `New login at ${attendance.login}` });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
