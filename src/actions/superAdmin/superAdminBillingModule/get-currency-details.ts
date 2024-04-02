"use server";
import prisma from "@/lib/db";
export const getCurrencyDetails = async (currencyId: number) => {
  return await prisma.adminCurrencies.findUnique({
    where: {
      id: currencyId,
    },
  });
};
