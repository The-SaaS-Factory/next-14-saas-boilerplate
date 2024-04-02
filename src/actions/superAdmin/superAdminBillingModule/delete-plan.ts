"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
const scope = "superAdmin:billing:upsert";

export const deletePlan = async (modelId: number) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { permissions } = await getUser(userClerk);

  checkPermission(permissions, scope);
  try {
    await prisma.plan.delete({
      where: {
        id: modelId,
      },
    });

    revalidatePath("/admin/billing/plans");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
