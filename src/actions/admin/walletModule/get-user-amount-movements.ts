"use server";

import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";

export const getAmountMovements = async (currencyCode: string) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  const currency = await prisma.adminCurrencies.findFirst({
    where: {
      code: currencyCode.toLowerCase(),
    },
  });

  if (!currency) return [];

  if (userId)
    return await prisma.adminMovementsAmounts.findMany({
      where: {
        userId,
        currencyId: currency.id,
      },
      include: {
        Currency: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
};
