import prisma from "../../lib/prisma.orm";

export const addWorker = async (name: string, dailyPayment: number) => {
  return await prisma.workers.create({
    data: {
      name: name,
      daily_payment: dailyPayment,
    },
  });
};

export const fetchAllWorkers = async () => {
  return await prisma.workers.findMany();
};

export const updateWorker = async (
  id: string,
  name: string,
  dailyPayment: number,
) => {
  return await prisma.workers.update({
    where: {
      id,
    },
    data: {
      name: name,
      daily_payment: dailyPayment,
    },
  });
};

export const deleteWorker = async (id: string) => {
  return await prisma.workers.delete({
    where: {
      id,
    },
  });
};
