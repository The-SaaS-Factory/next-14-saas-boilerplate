"use server";

import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export const getUserNotifications = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
    userFromAdminId?: number;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;

  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  const data = await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  //Update all notifications to viewed
  await prisma.notification.updateMany({
    where: {
      userId:  userId,
      viewed: false,
    },
    data: {
      viewed: true,
    },
  });

  const totalCount = await prisma.notification.count({
    where: {
      userId:   userId,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

export const getUserNotificationsUnreadCount = async () => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  return await prisma.notification.count({
    where: {
      userId: userId,
      viewed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
