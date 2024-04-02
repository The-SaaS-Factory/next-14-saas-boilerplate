"use server";
import prisma from "@/lib/db";

import { handleUpdateDataForUser } from "./clerkFacade";
import { Membership } from "@prisma/client";

const getCurrentMembership = async (userId: number) => {
  return await prisma.membership.findFirst({
    where: {
      userId,
    },
    include: {
      plan: true,
    },
  });
};

export const updateMembership = async ({
  userId,
  months,
  planId,
  pricingId,
  currencyId,
}: {
  userId: number;
  months: number;
  planId: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  let currentMemberShip = await getCurrentMembership(userId);

  const membership = await createMembership({
    userId,
    planId,
    currentMemberShip,
    months,
    pricingId,
    currencyId,
  });

  propagateCapabilitiesFromPlanToUser(planId, userId);
  handleUpdateDataForUser({
    scope: "publicMetadata",
    data: {
      membershipActive: true,
      membershipPlan: membership.plan.name,
      membershipStartDate: membership.startDate,
      membershipEndDate: membership.endDate,
    },
    userBdId: userId,
  });

  return membership;
};

const createMembership = async ({
  userId,
  planId,
  currentMemberShip,
  months,
  pricingId,
  currencyId,
}: {
  userId: number;
  planId: number;
  currentMemberShip: any;
  months: number;
  pricingId: number | null;
  currencyId: number | null;
}) => {
  const createPayload = {
    pricingId: pricingId,
    currencyId: currencyId,
    userId: userId,
    planId: planId,
    startDate: new Date(),
    endDate: new Date(),
  };

  const endDate = currentMemberShip
    ? new Date(currentMemberShip.endDate)
    : new Date();

  return await prisma.membership.upsert({
    where: {
      id: currentMemberShip ? currentMemberShip.id : 0,
    },
    create: createPayload,
    update: {
      planId: planId,
      pricingId: pricingId,
      currencyId: currencyId,
      endDate: new Date(endDate.setMonth(endDate.getMonth() + months)),
    },
    include: {
      plan: true,
    },
  });
};

export const propagateCapabilitiesOnAsociateWithPlanNewCapabilitie = async (
  planId = 0
) => {
  const users = await prisma.membership.findMany({
    where: {
      planId: planId,
    },
    distinct: ["userId"],
  });

  users.map((membership: Membership) => {
    propagateCapabilitiesFromPlanToUser(planId, membership.id as number);
  });
};

export const propagateCapabilitiesFromPlanToUser = async (
  planId: number,
  userId: number
) => {
  const capabilities = await prisma.planCapabilities.findMany({
    where: {
      planId: planId,
    },
    include: {
      capabilitie: true,
    },
  });

  Promise.all(
    capabilities.map(async (c: any) => {
      const userCapabilicitie = await prisma.userCapabilities.findFirst({
        where: {
          userId: userId,
          capabilitieId: c.capabilitie.id,
        },
      });

      if (!userCapabilicitie) {
        await prisma.userCapabilities.create({
          data: {
            userId: userId,
            capabilitieId: c.capabilitie.id,
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      } else {
        await prisma.userCapabilities.update({
          where: {
            id: userCapabilicitie.id,
          },
          data: {
            count: c.capabilitie.type === "LIMIT" ? 0 : c.count,
          },
        });
      }
    })
  );
};

export const getUserCapabilitiesNames = async (userId: number) => {
  const membership = await prisma.membership.findFirst({
    where: {
      userId,
    },
    include: {
      plan: {
        include: {
          PlanCapabilities: {
            include: {
              capabilitie: true,
            },
          },
        },
      },
    },
  });

 
  //35% cashback for affiliates
  const capabilitieNames = membership?.plan?.PlanCapabilities.map(
    (planCapability) => planCapability.capabilitie.name
  );

  return capabilitieNames;
};
