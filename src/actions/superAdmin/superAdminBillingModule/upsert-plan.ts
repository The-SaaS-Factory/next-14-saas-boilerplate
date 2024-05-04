"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";
export const upsertPlan = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: Prisma.PlanCreateInput | Prisma.PlanUpdateInput;
}) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { permissions } = await getUser(userClerk);
  
  

  checkPermission(permissions, scope);
  try {
    await prisma.plan.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        description: payload.description,
        status: payload.status,
        freeTrialDays: payload.freeTrialDays,
      },
      create: {
        name: payload.name as string,
        description: payload.description as string,
        status: payload.status as string,
        freeTrialDays: payload.freeTrialDays as number,
      },
    });

    revalidatePath("/admin/billing/plans/plans");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
