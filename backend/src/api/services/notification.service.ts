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
