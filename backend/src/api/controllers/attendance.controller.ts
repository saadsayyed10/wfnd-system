import { Request, Response } from "express";
import {
  createDay,
  fetchDay,
  loginWorkerAttendence,
  logoutWorkerAttendance,
} from "../services/attendance.service";
import { getAuth } from "@clerk/express";

export const createDayController = async (_req: Request, res: Response) => {
  try {
    await createDay();
    console.log("Day created");
    res.status(201).json({ message: `Day created` });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchDayController = async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }

    const day = await fetchDay(date.toString());
    console.log(JSON.stringify(day));
    res.status(200).json({ total: day.length, day });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const loginWorkerAttendenceController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { login } = req.body;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }

    const attendance = await loginWorkerAttendence(id.toString(), login);
    console.log(`Worker logged in`);
    res.status(200).json({ attendance });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const logoutWorkerAttendenceController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { logout } = req.body;
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }

    const attendance = await logoutWorkerAttendance(id.toString(), logout);
    console.log(`Worker logged out`);
    res.status(200).json({ attendance });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
