import { User } from "@prisma/client";

import { checkMarketingActionsOnRegister } from "./marketingFacade";

import { syncUserPermissions } from "./scurityFacade";
import prisma from "@/lib/db";
import {
  getClerkUserByExternalId,
  handleUpdateDataForUser,
} from "./clerkFacade";
import { createAmountByDefaultForUser } from "@/actions/admin/walletModule/create-amount-movement";
///import { getUserCapabilitiesNames } from "./membershipFacade";
import { notifyToSuperAdmin } from "./notificationFacade";
import { getUserCapabilitiesNames } from "./membershipFacade";
import { redirect } from "next/navigation";

export async function createDefaultSettingForuser(user: User) {
  await prisma.userSetting.create({
    data: {
      userId: user.id,
      settingName: "newPlatformNotification",
      settingValue: "1",
    },
  });
}

export const getUser = async (userAuthData: any) => {
  const include = {
    permissions: true,
    Membership: {
      include: {
        plan: {
          include: {
            PlanCapabilities: {
              include: {
                capabilitie: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  let user = await prisma.user.findFirst({
    where: {
      externalId: userAuthData.orgId || userAuthData.userId,
    },
    include,
  });

  if (!user) {
    user = await prisma.user.findFirst({
      where: {
        externalId: userAuthData.orgId || userAuthData.userId,
      },
      include,
    });

    const maxRetryAttempts = 5;
    const retryDelay = 500;

    let retryCount = 0;
    while (!user && retryCount < maxRetryAttempts) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      user = await prisma.user.findFirst({
        where: {
          externalId: userAuthData.orgId || userAuthData.userId,
        },
        include,
      });
      retryCount++;
    }

    if (!user) {
      redirect("/user-not-found");
    }
  }

  const permissions = user.permissions.map(
    (permission: any) => permission.name
  );

  let capabilities = [];

  if (user.Membership.length > 0) {
    capabilities = user.Membership[0].plan.PlanCapabilities.map(
      (planCapability: any) => planCapability.capabilitie.name
    );
  }

  const authData = {
    userId: user.id,
    permissions,
    capabilities,
  };

  return authData;
};

export const handleUserCreated = async (
  userData: any,
  source = "webhook"
): Promise<any> => {
  let newUser: any = null;

  const user = await prisma.user.findFirst({
    where: {
      externalId: userData.id,
    },
  });

  if (!user) {
    //Is possible that user can not be created by clerk, so we need to create it
    if (source === "request") {
      newUser = await prisma.user.create({
        data: {
          externalId: userData.id,
          email: userData.emailAddresses?.[0]?.emailAddress,
          name: userData.fullName || userData.firstName,
          avatar: userData.imageUrl,
        },
      });
    } else if (source === "webhook") {
      let payloadReferredBy: any = null;
      let payload = {
        externalId: userData.id,
        email: userData.email_addresses?.[0]?.email_address,
        name: userData.fullName || userData.first_name || userData.name,
        avatar: userData.profile_image_url || userData.image_url,
      };

      const userClerkId = userData.created_by;

      if (userClerkId) {
        const userRoot = await prisma.user.findFirst({
          where: {
            externalId: userClerkId,
          },
        });

        if (userRoot) {
          payload["email"] = userRoot.email;
          const capabilitiesNames = await getUserCapabilitiesNames(userRoot.id);
          if (capabilitiesNames?.includes("35% cashback for affiliates")) {
            payloadReferredBy = userRoot.id;
          }
        }
      }

      newUser = await prisma.user
        .create({
          data: {
            ...payload,
          },
        })
        .catch((error: Error) => {
          console.log("error", error);
        });

      if (newUser && payloadReferredBy) {
        await prisma.referral.create({
          data: {
            referredId: payloadReferredBy,
            referId: newUser.id,
          },
        });
      }
    }
  }

  if (!newUser) throw new Error("Error creating user");

  checkMarketingActionsOnRegister(newUser.id);

  createDefaultSettingForuser(newUser);

  createAmountByDefaultForUser({
    userId: newUser.id,
  });

  await handleUpdateDataForUser({
    scope: "privateMetadata",
    data: {
      userId: newUser.id,
    },
    userBdId: newUser.id,
  });

  notifyToSuperAdmin(
    `El usuario ${newUser.name} se ha registrado en la plataforma`
  );

  return newUser;
  // } else {
  //     onsole.log('hay user, repito, hay user', user);
  //   return handleUserUpdated(userData, "request");
  // }
};

export const handleUserDeleted = async (userData: any) => {
  const user = await prisma.user.findFirst({
    where: {
      externalId: userData.id,
    },
  });

  if (user) {
    return await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
};
export const handleUserUpdated = async (userData: any, source = "webhook") => {
  const user = await prisma.user.findFirst({
    where: {
      externalId: userData.id,
    },
  });

  if (user) {
    let dataUpdated = {};
    if (source === "request") {
      dataUpdated = {
        externalId: userData.id,
        email: userData.emailAddresses?.[0]?.emailAddress,
        name: userData.fullName || userData.firstName,
        phone: userData.primaryPhoneNumber,
        avatar: userData.imageUrl,
      };
    } else {
      dataUpdated = {
        externalId: userData.id,
        email: userData.email_addresses?.[0]?.email_address,
        name: userData.fullName || userData.first_name,
        avatar: userData.profile_image_url,
      };

      //Sync permissions by publicMetadata permisisons
      syncUserPermissions(user.id, userData.public_metadata.permissions);
    }

    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: dataUpdated,
    });
  } else {
    return handleUserCreated(userData);
  }
};

export const getUserByExternalId = async (externalId: string) => {
  let user = await prisma.user.findFirst({
    where: {
      externalId: externalId,
    },
  });

  if (!user) {
    const clerkUser = await getClerkUserByExternalId(externalId);
    return await handleUserCreated(clerkUser, "request");
  }

  return user;
};
