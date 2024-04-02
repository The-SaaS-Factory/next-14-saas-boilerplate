"use server";
import prisma from "@/lib/db";
export const getAllPlans = async () => {
  return {
    data: await prisma.plan.findMany({
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
          orderBy: {
            capabilitieId: "asc",
          },
        },
      },
    }),
  };
};
