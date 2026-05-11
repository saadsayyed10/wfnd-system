import prisma from "../../lib/prisma.orm";
import { triggerNotification } from "../../lib/trigger-notification";

export const addWorker = async (name: string, dailyPayment: number) => {
  const worker = await prisma.workers.create({
    data: {
      name: name,
      daily_payment: dailyPayment,
    },
  });

  await triggerNotification(
    "Worker",
    `New worker ${name} is added to the system with the daily payment of ₹ ${dailyPayment}`,
  );

  return worker;
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
