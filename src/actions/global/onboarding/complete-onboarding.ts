"use server";

import {
  createClerkOrganization,
  handleUpdateDataForUser,
} from "@/utils/facades/serverFacades/clerkFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";

export default async function completeOnboarding(payload: any) {
  const userClerk = auth();

  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  let organization: any = null;

  await createClerkOrganization({
    name: payload.applicationName || "",
    createdBy: userClerk.userId,
  })
    .then((data: any) => {
      organization = data;
    })
    .catch((error) => {
      console.log("Error creating organization", error);
      throw new Error("Error creating organization");
    });

  return await handleUpdateDataForUser({
    scope: "publicMetadata",
    userBdId: userId,
    data: {
      onboardingComplete: true,
      applicationName: payload.applicationName || "", //Some data from the form
    },
  })
    .then(() => {
      return  JSON.stringify({
        organization,
        message: "ok",
      });
    })
    .catch((error) => {
      console.log("Error updating user metadata", error);

      console.error("Error updating user metadata", error);
      return "error";
    });
}
