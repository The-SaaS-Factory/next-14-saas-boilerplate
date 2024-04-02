"use server";

import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export const getMembershipDetails = async (membershipId: number) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");

  const membership = await prisma.membership.findFirst({
    where: {
      id: membershipId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      currency: true,
      plan: true,
      pricing: true,
    },
  });

  return membership;
};
