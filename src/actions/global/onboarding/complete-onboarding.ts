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
  
  await createClerkOrganization({
    name: payload.applicationName || "",
    createdBy: userClerk.userId,
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error creating organization", error);
      throw new Error("Error creating organization");
    });

  //Store now in your model the onboarding data and then, update the user metadata in clerk
  return await handleUpdateDataForUser({
    scope: "publicMetadata",
    userBdId: userId,
    data: {
      onboardingComplete: true,
      applicationName: payload.applicationName || "", //Some data from the form
    },
  })
    .then(() => {
      return "ok";
    })
    .catch((error) => {
      console.log("Error updating user metadata", error);

      console.error("Error updating user metadata", error);
      return "error";
    });
}
