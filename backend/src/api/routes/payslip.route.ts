import { Router } from "express";
import {
  deleteAllPayslipController,
  fetchPayslipsController,
  generatePayslipController,
} from "../controllers/payslip.controller";

const payslipRoutes = Router();

payslipRoutes.post("/generate", generatePayslipController);
payslipRoutes.get("/", fetchPayslipsController);
payslipRoutes.delete("/wipe", deleteAllPayslipController);

export default payslipRoutes;
