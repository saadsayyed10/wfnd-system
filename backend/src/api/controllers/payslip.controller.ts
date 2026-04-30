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
  const { weekStart, weekEnd } = req.body;

  const data = { weekStart, weekEnd };
  if (!data) {
    console.log("Required data fields are missing");
    return res.status(404).json({ error: "Required data fields are missing" });
  }

  try {
    const payslip = await fetchPayslips(weekStart, weekEnd);
    console.log(JSON.stringify(payslip));
    res.status(200).json({ payslip });
  } catch (error: any) {
    console.log(error.message);
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
