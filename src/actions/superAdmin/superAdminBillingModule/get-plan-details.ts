"use server";
import prisma from "@/lib/db";
export const getPlanDetails = async (planId: number) => {
  return await prisma.plan.findUnique({
    where: {
      id: planId,
    },
    include: {
      pricing: {
        include: {
          settings: true,
        },
      },
      PlanCapabilities: {
        include: {
          capabilitie: true,
        },
      },
    },
  });
};
