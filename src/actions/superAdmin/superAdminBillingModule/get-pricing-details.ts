"use server";
import prisma from "@/lib/db";

export const getPricingDetails = async (id: number) => {
  try {
    const plan = await prisma.pricing.findUnique({
      where: {
        id,
      },
    });

    return plan;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
