"use server";

import prisma from "@/lib/db";

export const storeAffiliateForUser = async (
  userId: number,
  affiliateId: number
): Promise<any> => {
  try {

    //Check if user already has an affiliate
    const userAffiliate = await prisma.referral.findFirst({
      where: {
        referId: userId,
      },
    });

    if (userAffiliate) {
      return 'already-affiliate'
    }

    await prisma.referral.create({
      data: {
        referId: userId,
        referredId: affiliateId,
      },
    });

    return 'success'
  } catch (error: any) {
    throw new Error(error);
  }
};
