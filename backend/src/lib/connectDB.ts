import prisma from "./prisma.orm";

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL DB");
  } catch (error: any) {
    console.log("Error connecting to PostgreSQL DB", error.message);
  }
};
