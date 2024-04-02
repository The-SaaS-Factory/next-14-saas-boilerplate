"use server";
import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";

export const getUserCapabilities = async () => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");

  const { userId } = await getUser(userClerk);

  return await prisma.userCapabilities.findMany({
    where: {
      userId,
    },
  });
};
