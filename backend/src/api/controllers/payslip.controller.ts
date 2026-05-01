import { Request, Response } from "express";
import {
  deleteAllPayslip,
  fetchPayslips,
  generatePayslips,
} from "../services/payslips.service";

export const generatePayslipController = async (
  req: Request,
  res: Response,
) => {
  const { workersIds, weekStart, weekEnd } = req.body;

  const data = { workersIds, weekStart, weekEnd };
  if (!data) {
    console.log("Required data fields are missing");
    return res.status(404).json({ error: "Required data fields are missing" });
  }

  try {
    const payslip = await generatePayslips(workersIds, weekStart, weekEnd);
    console.log("Payslip generated\n", JSON.stringify(payslip));
    res.status(201).json({ message: "Payslip generated", payslip });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchPayslipsController = async (req: Request, res: Response) => {
  const { weekStart, weekEnd } = req.query;

  if (!weekStart || !weekEnd) {
    return res
      .status(400)
      .json({ error: "weekStart and weekEnd are required" });
  }

  if (typeof weekStart !== "string" || typeof weekEnd !== "string") {
    return res.status(400).json({ error: "Invalid query params" });
  }

  const startDate = new Date(weekStart);
  const endDate = new Date(weekEnd);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  try {
    const payslip = await fetchPayslips(startDate, endDate);
    res.status(200).json({ totalWorker: payslip.length, payslip });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAllPayslipController = async (
  _req: Request,
  res: Response,
) => {
  try {
    await deleteAllPayslip();
    console.log(JSON.stringify("Deleted all payslips"));
    res.status(204).json({ message: "Deleted all payslips" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
