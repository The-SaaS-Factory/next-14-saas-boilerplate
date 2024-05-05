import { WebhookEvent, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import prisma from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import {
  handleUserCreated,
  handleUserDeleted,
  handleUserUpdated,
} from "./userFacade";

const webhookSecret = process.env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET || ``;

export async function validateClerkRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export const handleEventWebhook = async (evt: WebhookEvent) => {
  switch (evt.type) {
    case "user.created":
      await handleUserCreated(evt.data, "webhook");
      break;
    case "user.updated":
      await handleUserUpdated(evt.data, "webhook");
      break;
    case "user.deleted":
      await handleUserDeleted(evt.data);
      break;
    case "organization.created":
      await handleUserCreated(evt.data, "webhook");
      break;
    case "organization.updated":
      await handleUserUpdated(evt.data, "webhook");
      break;
  }
};

const getUserClerkId = async (userId: number) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      externalId: true,
    },
  });
};

export const getOrganizationMembers = async (organizationId: string) => {
  return await clerkClient.organizations.getOrganizationMembershipList({
    organizationId,
  });
};

export const handleUpdateDataForUser = async ({
  scope,
  userBdId,
  data,
}: {
  scope: "publicMetadata" | "privateMetadata" | "unsafeMetadata";
  userBdId: number;
  data: any;
}) => {
  const user = await getUserClerkId(userBdId);
  let userId: string | null = null;
  let userType: "user" | "organization" = "organization";

  if (user) {
    userId = user.externalId;

    //If start with "org_" is an organization
    if (userId.startsWith("user_")) {
      userType = "user";
    }
  }

  if (!userId) throw new Error("User not found");

  if (scope === "publicMetadata") {
    if (userType === "user") {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: data,
      });
    } else {
      await clerkClient.organizations.updateOrganizationMetadata(userId, {
        publicMetadata: data,
      });
    }
  }

  if (scope === "privateMetadata") {
    if (userType === "user") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: data,
      });
    } else {
      await clerkClient.organizations.updateOrganizationMetadata(userId, {
        privateMetadata: data,
      });
    }
  }

  if (scope === "unsafeMetadata") {
    await clerkClient.users.updateUserMetadata(userId, {
      unsafeMetadata: data,
    });
  }
};

export const getUserOrganizations = async (userId: number) => {
  const userClerkId = await getUserClerkId(userId);

  if (!userClerkId) throw new Error("User clerk not found");
};

export const getClerkUserByExternalId = async (externalId: string) => {
  return await clerkClient.users.getUser(externalId);
};

export const getUserInBdByExternalId = async (externalId: string) => {
  return await prisma.user.findFirst({
    where: {
      externalId,
    },
  });
};

export const getUserInClerk = async () => {
  const userClerk = await currentUser();
  if (!userClerk) throw new Error("User not found");

  return await getUserInBdByExternalId(userClerk.id);
};

export const deleteClerkUser = async (userId: string) => {
  await clerkClient.users.deleteUser(userId);
};

export const createClerkUser = async (payload: any) => {
  return await clerkClient.users.createUser(payload);
};

export const createClerkOrganization = async (payload: any) => {
  return await clerkClient.organizations.createOrganization(payload);
};
