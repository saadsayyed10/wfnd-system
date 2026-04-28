import { Request, Response } from "express";
import { createDay } from "../services/attendance.service";

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
