"use server";
import prisma from "@/lib/db";
import { stripeCreateCoupon } from "@/utils/facades/serverFacades/stripeFacade";
import { Coupon } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
export const connectCouponWithStripe = async ({
  couponId,
  currencyCode,
  pathToRevalidate,
}: {
  couponId: number;
  currencyCode: string;
  pathToRevalidate: string;
}) => {
  const coupon: Coupon | null = await prisma.coupon.findUnique({
    where: { id: couponId },
  });

  if (coupon) {
    try {
      const currency = await prisma.adminCurrencies.findFirst({
        where: {
          code: currencyCode.toLowerCase() ?? "usd",
        },
      });

      if (!currency) {
        throw new Error("Currency not found");
      }

      let couponPayload: Stripe.CouponCreateParams = {
        currency: currencyCode.toLowerCase() ?? "usd",
        name: coupon.name,
      };

      if (coupon.amountOff) {
        couponPayload.amount_off = coupon.amountOff;
      }

      if (coupon.percentOff && !coupon.amountOff) {
        couponPayload.percent_off = coupon.percentOff;
      }

      const stripeCoupon = await stripeCreateCoupon(couponPayload).catch(
        (error) => {
          console.log(error);
        }
      );


      if (stripeCoupon) {
        const couponSetting = await prisma.couponSettings.findFirst({
          where: {
            couponId: coupon.id,
            name: "stripeCouponId_" + currencyCode.toLowerCase() ?? "usd",
          },
        });

        await prisma.couponSettings.upsert({
          where: {
            id: couponSetting?.id ?? 0,
          },
          update: {
            value: stripeCoupon.id,
          },
          create: {
            couponId: coupon.id,
            name: "stripeCouponId_" + currencyCode.toLowerCase() ?? "usd",
            value: stripeCoupon.id,
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
