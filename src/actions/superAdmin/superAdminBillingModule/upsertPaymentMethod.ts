"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";
export const upsertPaymentMethod = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: Prisma.PaymentMethodCreateInput | Prisma.PaymentMethodUpdateInput;
}) => {
  try {
    const userClerk = auth();
    if (!userClerk) throw new Error("client clerk not found");
    const { permissions } = await getUser(userClerk);
  
    checkPermission(permissions, scope);
    
    await prisma.paymentMethod.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        ...payload,
      },
      create: {
        ...(payload as Prisma.PaymentMethodCreateInput),
      },
    });

    revalidatePath("/admin/settings/billing");
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};
