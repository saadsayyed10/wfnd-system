import { Router } from "express";
import { generatePayslipController } from "../controllers/payslip.controller";

const payslipRoutes = Router();

payslipRoutes.post("/generate", generatePayslipController);

export default payslipRoutes;
