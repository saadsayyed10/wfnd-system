import { Router } from "express";
import {
  fetchPayslipsController,
  generatePayslipController,
} from "../controllers/payslip.controller";

const payslipRoutes = Router();

payslipRoutes.post("/generate", generatePayslipController);
payslipRoutes.get("/", fetchPayslipsController);

export default payslipRoutes;
