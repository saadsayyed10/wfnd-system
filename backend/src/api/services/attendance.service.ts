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

export const fetchDay = async (date: string) => {
  return await prisma.attendance.findMany({
    where: {
      date: new Date(date),
    },
    select: {
      workerId: true,
      login: true,
      logout: true,
      type: true,
      workers: {
        select: {
          name: true,
        },
      },
    },
  });
};
