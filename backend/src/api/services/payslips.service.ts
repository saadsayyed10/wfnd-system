import prisma from "../../lib/prisma.orm";

export const generatePayslips = async (
  workerIds: string[],
  weekStart: Date,
  weekEnd: Date,
) => {
  const start = weekStart.toString().split("T")[0];
  const end = weekEnd.toString().split("T")[0];

  const timeZone = "T18:45:00.000Z";
  const newStart = start + timeZone;
  const newEnd = end + timeZone;

  const workers = await prisma.workers.findMany({
    where: {
      id: { in: workerIds },
    },
  });

  if (workers.length === 0) throw new Error("No workers found");

  // Warn if some IDs were not found
  if (workers.length !== workerIds.length) {
    const foundIds = new Set(workers.map((w) => w.id));
    const missingIds = workerIds.filter((id) => !foundIds.has(id));
    console.warn(`Workers not found for IDs: ${missingIds.join(", ")}`);
  }

  // Fetch all attendance records for all workers in one query
  const allAttendance = await prisma.attendance.findMany({
    where: {
      workerId: { in: workerIds },
      date: {
        gte: newStart,
        lte: newEnd,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  // Group attendance by workerId
  const attendanceByWorker = allAttendance.reduce(
    (acc, record) => {
      if (!acc[record.workerId!]) acc[record.workerId!] = [];
      acc[record.workerId!].push(record);
      return acc;
    },
    {} as Record<string, typeof allAttendance>,
  );

  // Build payslip data for each worker
  const payslipData = workers.map((worker) => {
    const attendance = attendanceByWorker[worker.id] ?? [];

    const presentDays = attendance.filter((a) => a.type === "PRESENT").length;

    const halfDays = attendance.filter((a) => a.type === "HALFDAY").length;

    const totalDays = presentDays + halfDays * 0.5;

    const overtimeTotal = attendance.reduce(
      (sum, a) => sum + (a.overtimeHours || 0),
      0,
    );

    // 11 hrs = 1 day
    const actualDays = totalDays + overtimeTotal;

    const weeklyWage = actualDays * worker.daily_payment;

    return {
      workersId: worker.id,
      week_start: weekStart,
      week_end: weekEnd,
      total_days: totalDays,
      actual_days: actualDays,
      overtime_total: overtimeTotal,
      weekly_wage: weeklyWage,
      payslip_data: attendance,
    };
  });

  // Use createMany with skipDuplicates to respect your @@unique constraint
  await prisma.payslips.createMany({
    data: payslipData,
    skipDuplicates: true,
  });

  return payslipData;
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

export const deleteAllPayslip = async () => {
  return await prisma.payslips.deleteMany();
};
