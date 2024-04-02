"use server";

import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const deleteCurrency = async (currencyId: number) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { permissions } = await getUser(userClerk);

  checkPermission(permissions, scope);

  await prisma.adminCurrencies.delete({
    where: {
      id: currencyId,
    },
  });

  revalidatePath("/admin/settings/billing");
};
