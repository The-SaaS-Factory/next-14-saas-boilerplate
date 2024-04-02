"use server";
import prisma from "@/lib/db";
import { deleteClerkUser } from "@/utils/facades/serverFacades/clerkFacade";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  if (user.externalId) {
    deleteClerkUser(user.externalId);
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath(`/admin/users`);
};
