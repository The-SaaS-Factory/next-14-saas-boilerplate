"use server";
import prisma from "@/lib/db";

export const getPaymentMethods = async () => {
  return await prisma.paymentMethod.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
