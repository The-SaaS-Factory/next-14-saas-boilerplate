"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const scope = "superAdmin:billing:upsert";

export const upsertCurrency = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload:
    | Prisma.AdminCurrenciesCreateInput
    | Prisma.AdminCurrenciesUpdateInput;
}) => {
  try {

    const userClerk = auth();
    if (!userClerk) throw new Error("client clerk not found");
    const { permissions } = await getUser(userClerk);
  
    checkPermission(permissions, scope);


    await prisma.adminCurrencies.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        main: parseInt(payload.main as string),
        code: payload.code as string,
        rate: payload.rate as number,
      },
      create: {
        name: payload.name as string,
        main: parseInt(payload.main as string),
        rate: payload.rate as number,
        code: payload.code as string,
      },
    });

    revalidatePath("/admin/settings/billing");
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
  }
};
