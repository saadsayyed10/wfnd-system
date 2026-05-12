import prisma from "./prisma.orm";

export const triggerNotification = async (
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
