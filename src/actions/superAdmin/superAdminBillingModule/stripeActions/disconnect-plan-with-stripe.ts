"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const disconnectStripePlanWithLocalPlan = async (
  localPlanId: number,
  currencyCode: string
) => {
  await prisma.pricingSetting.deleteMany({
    where: {
      pricingId: localPlanId,
      settingName: "STRIPE_PLAN_ID_" + currencyCode,
    },
  });

  revalidatePath("/admin/billing/plans/plans");
};
