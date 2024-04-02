"use server";
import prisma from "@/lib/db";
export const getPlanByName = async (name: string) => {
  return await prisma.plan.findFirst({
    where: {
      name: name,
    },
    include: {
      PlanCapabilities: {
        include: {
          capabilitie: true,
        },
        orderBy: {
          capabilitieId: "asc",
        },
      },
    },
  });
};
