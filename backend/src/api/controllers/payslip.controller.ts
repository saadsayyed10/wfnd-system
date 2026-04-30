import { Request, Response } from "express";
import { generatePayslip } from "../services/payslips.service";

export const generatePayslipController = async (
  req: Request,
  res: Response,
) => {
  const { workerId, weekStart, weekEnd } = req.body;

  const data = { workerId, weekStart, weekEnd };
  if (!data) {
    console.log("Required data fields are missing");
    return res.status(404).json({ error: "Required data fields are missing" });
  }

  try {
    const payslip = await generatePayslip(workerId, weekStart, weekEnd);
    console.log("Payslip generated\n", JSON.stringify(payslip));
    res.status(201).json({ message: "Payslip generated", payslip });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
