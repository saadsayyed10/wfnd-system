import prisma from "../../lib/prisma.orm";

export const generatePayslip = async (
  workerId: string,
  weekStart: Date,
  weekEnd: Date,
) => {
  const start = weekStart.toString().split("T")[0];
  const end = weekEnd.toString().split("T")[0];

  const timeZone = "T18:45:00.000Z";

  const newStart = start + timeZone;
  const newEnd = end + timeZone;

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
        gte: newStart,
        lte: newEnd,
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

export const fetchPayslips = async (weekStart: Date, weekEnd: Date) => {
  return await prisma.payslips.findMany({
    where: {
      week_start: weekStart,
      week_end: weekEnd,
    },
    select: {
      id: true,
      payslip_data: true,
      actual_days: true,
      weekly_wage: true,
      overtime_total: true,
      total_days: true,
      workersId: true,
      workers: {
        select: {
          name: true,
          daily_payment: true,
        },
      },
      week_start: true,
      week_end: true,
      created_at: true,
    },
    orderBy: {
      workersId: "asc",
    },
  });
};

export const convertPayslipToExcel = async () => {};

export const deletePayslip = async () => {};
