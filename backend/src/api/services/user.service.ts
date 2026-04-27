import { UserType } from "@prisma/client";
import prisma from "../../lib/prisma.orm";

export const syncClerkUser = async (
  clerkId: string,
  name: string,
  email: string,
  profilePicture: string,
  userType: UserType,
) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new Error("User account already exists");

  return await prisma.users.create({
    data: {
      clerkId: clerkId,
      name: name,
      email: email,
      profile_picture: profilePicture,
      user_type: userType,
    },
  });
};
