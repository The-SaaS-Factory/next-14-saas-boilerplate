"use server";
import prisma from "@/lib/db";
import { updateMembership } from "@/utils/facades/serverFacades/membershipFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
 
export type PlanInvoiceType = {
  currencyId: number;
  priceId: number;
  paymentMethodName: string;
};

export const activateTrialPlan = async ({
  planId,
  pricingId,
  currencyId,
}: {
  planId: number;
  pricingId: number;
  currencyId: number;
}) => {
  const userClerk = auth();

  if (!userClerk) throw new Error("client clerk not found");

  const { userId } = await getUser(userClerk);
  const plan = await prisma.plan.findFirst({
    where: {
      id: planId,
    },
  });

  if (!plan) throw new Error("Plan not found");
  if (!plan.freeTrialDays)
    throw new Error("Plan does not have free trial days");

  const membership = await updateMembership({
    pricingId: pricingId,
    currencyId: currencyId,
    userId: userId,
    months: plan.freeTrialDays / 30,
    planId: plan.id,
  });

  return membership;
};
