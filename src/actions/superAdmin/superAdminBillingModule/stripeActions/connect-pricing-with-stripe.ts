"use server";
import prisma from "@/lib/db";
import { stripeCreatePlan } from "@/utils/facades/serverFacades/stripeFacade";
import { Pricing, frequencyType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
export const connectPricingWithStripe = async ({
  pricingId,
  currencyCode,
  pathToRevalidate,
  stripeProductId,
}: {
  pricingId: number;
  currencyCode: string;
  pathToRevalidate: string;
  stripeProductId: string;
}) => {
  const pricing: Pricing | null = await prisma.pricing.findUnique({
    where: { id: pricingId },
  });

  if (pricing) {
    try {
      let intervalCount = 1;
      let intervaltype: Stripe.PlanCreateParams.Interval = "month";

      switch (pricing.frequency) {
        case frequencyType.MONTHLY:
          intervalCount = 1;
          break;
        case frequencyType.QUARTERLY:
          intervalCount = 3;
          intervaltype = "month";
          break;
        case frequencyType.SEMIANNUAL:
          intervalCount = 6;
          intervaltype = "month";
          break;
        case frequencyType.YEARLY:
          intervalCount = 12;
          intervaltype = "year";
          break;
        case frequencyType.BIANNUAL:
          intervalCount = 24;
          intervaltype = "year";
          break;
        case frequencyType.TRIENNIALLY:
          intervalCount = 36;
          intervaltype = "year";
          break;
        case frequencyType.LIFETIME:
          intervalCount = 1200;
          intervaltype = "year";
          break;

        default:
          1;
          break;
      }

      const currency = await prisma.adminCurrencies.findFirst({
        where: {
          code: currencyCode.toLowerCase() ?? "usd",
        },
      });

      if (!currency) {
        throw new Error("Currency not found");
      }

      const planPayload: Stripe.PlanCreateParams = {
        amount: Math.round(pricing.price * currency.rate * 100),
        currency: currencyCode.toLowerCase() ?? "usd",
        interval: intervaltype,
        interval_count: intervalCount,
        product: stripeProductId,
      };

      const stripePrice = await stripeCreatePlan(
        stripeProductId,
        planPayload
      ).catch((error) => {
        console.log(error);
      });

      if (stripePrice) {
        const pricingSetting = await prisma.pricingSetting.findFirst({
          where: {
            pricingId: pricingId,
            settingName: "stripePriceId_" + currencyCode.toLowerCase() ?? "usd",
          },
        });

        await prisma.pricingSetting.upsert({
          where: {
            id: pricingSetting?.id ?? 0,
          },
          update: {
            settingValue: stripePrice.id,
          },
          create: {
            pricingId: pricingId,
            settingName: "stripePriceId_" + currencyCode.toLowerCase() ?? "usd",
            settingValue: stripePrice.id,
          },
        });

        revalidatePath(pathToRevalidate);

        return true;
      }
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message);
    }
  } else {
    throw new Error("Local plan not found");
  }
};
