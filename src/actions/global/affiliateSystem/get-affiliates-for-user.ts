"use server";

import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";

export const getAffiliatesForUser = async (): Promise<any> => {
  try {
    const userClerk = auth();
    if (!userClerk) throw new Error("client clerk not found");
    const { userId } = await getUser(userClerk);

    //Check if user already has an affiliate
    const userAffiliate = await prisma.referral.findMany({
      where: {
        referredId: userId,
      },
      include: {
        refer: {
          select: {
            name: true,
            createdAt: true,
          },
        },
      },
    });

    if (userAffiliate) {
      return userAffiliate;
    }

    return "no-affiliate";
  } catch (error: any) {
    throw new Error(error);
  }
};
