import prisma from "../../lib/prisma.orm";

export const loginUser = async (workerId: string, login: string) => {
  return await prisma.attendance.create({
    data: {
      workerId,
      login,
    },
  });
};
