import prisma from "../../lib/prisma.orm";

export const createDay = async () => {
  const workers = await prisma.workers.findMany();

  const attendanceData = workers.map((worker) => ({
    workerId: worker.id,
    login: "-",
    logout: "-",
  }));

  return await prisma.attendance.createMany({
    data: attendanceData,
  });
};
