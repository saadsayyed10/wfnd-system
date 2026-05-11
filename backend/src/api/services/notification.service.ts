import prisma from "../../lib/prisma.orm";

export const fetchAllNotifications = async () => {
  return await prisma.notifications.findMany();
};

export const deleteAllNotifications = async () => {
  return await prisma.notifications.deleteMany();
};
