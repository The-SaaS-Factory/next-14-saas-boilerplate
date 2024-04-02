import prisma from "@/lib/db";
import { Permission } from "@prisma/client";

export const checkPermission = (
  userPermissions: string[],
  permissionName: string
) => {
  !userPermissions.includes(permissionName) &&
    !userPermissions.includes("superAdmin:totalAccess") &&
    returnUnauthorized();
};

export const hasPermission = (
  userPermissions: string[],
  permissionName: string
) => {
  return (
    userPermissions.includes(permissionName) ||
    userPermissions.includes("superAdmin:totalAccess")
  );
};

export const returnUnauthorized = () => {
  throw new Error("You don't have  permission to do this action");
};

export const syncPermissionsIncomesWithBD = async (permissions: string[]) => {
  const permissionsFound = await prisma.permission.findMany({
    where: {
      name: {
        in: permissions,
      },
    },
  });

  const permissionsToCreate = permissions.filter(
    (permission) =>
      !permissionsFound.find(
        (permissionFound) => permissionFound.name === permission
      )
  );

  await prisma.permission.createMany({
    data: permissionsToCreate.map((permission) => ({
      name: permission,
    })),
    skipDuplicates: true,
  });

  const allPermissions = await prisma.permission.findMany({});

  return allPermissions;
};

export const syncUserPermissions = async (
  userId: number,
  permissionsNames: string[]
) => {
  //This is the way for add permissions to BD, from clerk
  await syncPermissionsIncomesWithBD(permissionsNames ?? []);

  const oldPermissions = await prisma.permission.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  const permissions = permissionsNames
    ? await prisma.permission.findMany({
        where: {
          name: {
            in: permissionsNames,
          },
        },
      })
    : [];

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      permissions: {
        disconnect: oldPermissions,
        connect: permissions.map((permission: Permission) => ({
          id: permission.id,
        })),
      },
    },
  });
};

export const getSuperAdminAdmins = async () => {
  const organizations = await prisma.user.findMany({
    where: {
      permissions: {
        some: {
          name: "superAdmin:totalAccess",
        },
      },
    },
  });

  return organizations;
};
