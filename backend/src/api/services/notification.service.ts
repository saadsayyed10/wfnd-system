import prisma from "../../lib/prisma.orm";

export const createNotificationService = async (
  title: string,
  description: string,
) => {
  return await prisma.notifications.create({
    data: {
      title,
      description,
    },
  });
};

export const fetchAllNotifications = async () => {
  return await prisma.notifications.findMany();
};

export const deleteAllNotifications = async () => {
  return await prisma.notifications.deleteMany();
};
