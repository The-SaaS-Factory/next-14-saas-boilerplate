"use server";

import { createClerkUser } from "@/utils/facades/serverFacades/clerkFacade";
import {
  getUser,
  handleUserCreated,
} from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { storeAffiliateForUser } from "./store-affiliate-for-user";

export const createUserFromAffiliatePanel = async (
  payload: any
): Promise<any> => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);
  
  const payloadNew = {
    first_name: payload.first_name,
    email_address: [`${payload.email_address}`],
    password: payload.password,
  };
 
  try {
    const user = await createClerkUser(payloadNew);

    if (!user) throw new Error("Error creating user");

   
    const userInBd = await handleUserCreated(user, "request");

  
    await storeAffiliateForUser(userInBd.id, userId);

    return "success";
  } catch (error: any) {
    console.log("error", error);

    throw new Error(error);
  }
};
