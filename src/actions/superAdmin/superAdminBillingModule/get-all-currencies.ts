"use server";

import prisma from "@/lib/db";

export const getAllCurrencies = async () => {
  return await prisma.adminCurrencies.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
