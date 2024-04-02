"use server";
import prisma from "@/lib/db";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";
export const upsertCapabilitie = async ({
  modelId,
  payload,
}: {
  modelId?: number;
  payload: Prisma.CapabilitieCreateInput | Prisma.CapabilitieUpdateInput;
}) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { permissions } = await getUser(userClerk);

  checkPermission(permissions, scope);

  try {
    await prisma.capabilitie.upsert({
      where: {
        id: modelId ? modelId : 0,
      },
      update: {
        name: payload.name,
        description: payload.description,
        type: payload.type,
        title: payload.title,
      },
      create: {
        name: payload.name as string,
        description: payload.description as string,
        type: payload.type as string,
        title: payload.title as string,
      },
    });

    revalidatePath("/admin/billing/plans/capabilities");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
