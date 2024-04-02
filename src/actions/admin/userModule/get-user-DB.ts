"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getUser } from "@/utils/facades/serverFacades/userFacade";

export const getUserDB = async (): Promise<any> => {
  const userClerk = auth();

  if (!userClerk) throw new Error("client clerk not found");

  const { userId } = await getUser(userClerk);

  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Amounts: {
        include: {
          Currency: true,
        },
      },
      referredBy: {
        select: {
          id: true,
        },
      },
    },
  });
};
