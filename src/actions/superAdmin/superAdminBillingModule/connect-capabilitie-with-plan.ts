"use server";
import prisma from "@/lib/db";
import { propagateCapabilitiesOnAsociateWithPlanNewCapabilitie } from "@/utils/facades/serverFacades/membershipFacade";
import { revalidatePath } from "next/cache";
export const connectCapabilitieWithPlan = async (args: any) => {
  const oldConection = await prisma.planCapabilities.findFirst({
    where: {
      capabilitieId: args.capabilitieId,
      planId: args.planId,
    },
  });

  //For all users and organizations with membership with this plan, propagate the new capabilities
  !oldConection &&
    propagateCapabilitiesOnAsociateWithPlanNewCapabilitie(args.planId);

  await prisma.planCapabilities.upsert({
    where: {
      id: oldConection ? oldConection.id : 0,
    },
    update: {
      count: args.count,
      name: args.name,
    },
    create: {
      capabilitieId: args.capabilitieId,
      planId: args.planId,
      count: args.count,
      name: args.name,
    },
  });

  revalidatePath("/admin/billing/plans/plans/edit " + args.planId);
};
