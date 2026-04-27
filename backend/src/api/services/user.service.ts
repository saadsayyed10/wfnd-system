import prisma from "../../lib/prisma.orm";
import { AppError } from "../../middleware/error.middleware";

export const syncClerkUser = async (
  clerkId: string,
  name: string,
  email: string,
  profilePicture: string,
) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new AppError("User account already exists", 500);

  return await prisma.users.create({
    data: {
      clerkId: clerkId,
      name: name,
      email: email,
      profile_picture: profilePicture,
    },
  });
};

export const fetchClerkUser = async (userId: string) => {
  return await prisma.users.findUnique({
    where: {
      clerkId: userId,
    },
  });
};
