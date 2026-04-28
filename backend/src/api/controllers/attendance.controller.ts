import { Request, Response } from "express";
import { createDay, fetchDay } from "../services/attendance.service";
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
    return res.status(500).json({ error: error.message });
  }
};
