import prisma from "../../lib/prisma.orm";

export const generatePayslip = async (
  workerId: string,
  weekStart: string,
  weekEnd: string,
) => {
  const start = new Date(weekStart);
  const end = new Date(weekEnd);

  const worker = await prisma.workers.findUnique({
    where: {
      id: workerId,
    },
  });

  if (!worker) throw new Error("Worker not found");

  const attendance = await prisma.attendance.findMany({
    where: {
      workerId,
      date: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const totalDays = attendance.filter((a) => a.type === "PRESENT").length;

  const overtimeTotal = attendance.reduce((sum, a) => sum + a.overtimeHours, 0);

  const actualDays = totalDays + overtimeTotal;

  const weeklyWage = actualDays * worker.daily_payment;

  return await prisma.payslips.create({
    data: {
      workersId: workerId,
      week_start: weekStart,
      week_end: weekEnd,
      total_days: totalDays,
      actual_days: actualDays,
      overtime_total: overtimeTotal,
      weekly_wage: weeklyWage,
      payslip_data: attendance,
    },
  });
};

export const fetchPayslips = async () => {};

export const convertPayslipToExcel = async () => {};

export const deletePayslip = async () => {};
