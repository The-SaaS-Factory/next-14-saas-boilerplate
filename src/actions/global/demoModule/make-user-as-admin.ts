"use server";

import { handleUpdateDataForUser } from "@/utils/facades/serverFacades/clerkFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const makeUserAsAdmin = async () => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  //Store now in your model the onboarding data and then, update the user metadata in clerk
  await handleUpdateDataForUser({
    scope: "publicMetadata",
    userBdId: userId,
    data: {
      isSuperAdmin: true,
      permissions: ["superAdmin:totalAccess"],
    },
  })
    .then(() => {
      return "ok";
    })
    .catch((error) => {
      console.error("Error updating user metadata", error);
      return "error";
    });

  redirect("/admin");
};
