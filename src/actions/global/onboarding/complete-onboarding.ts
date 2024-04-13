"use server";

import { handleUpdateDataForUser } from "@/utils/facades/serverFacades/clerkFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";

export default async function completeOnboarding(payload: any) {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  console.log("payload form form in onboarding page", payload);
  console.log("userId", userId);

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
      console.error("Error updating user metadata", error);
      return "error";
    });
}
