"use server";
import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import {
  InvoiceModelType,
  InvoiceStatus,
  PricingSetting,
  Prisma,
} from "@prisma/client";

export type PlanInvoiceType = {
  currencyId: number;
  priceId: number;
  paymentMethodName: string;
};

export const createPlanInvoice = async ({
  payload,
}: {
  payload: PlanInvoiceType;
}) => {
  const userClerk = auth();

  if (!userClerk) throw new Error("client clerk not found");

  const { userId } = await getUser(userClerk);

  let stripePriceId = null;

  const price = await prisma.pricing.findUnique({
    where: {
      id: payload.priceId,
    },
    include: {
      settings: true,
      Plan: true,
    },
  });

  if (!price) {
    throw new Error("Price not found");
  }
  const plan = price.Plan;

  if (!plan) {
    throw new Error("Plan not found");
  }

  const currency = await prisma.adminCurrencies.findUnique({
    where: {
      id: payload.currencyId,
    },
  });

  if (!currency) {
    throw new Error("Currency not found");
  }

  if (payload.paymentMethodName === "Stripe") {
    stripePriceId = price.settings.find(
      (setting: PricingSetting) =>
        setting.settingName === "stripePriceId_" + currency.code.toLowerCase()
    )?.settingValue;

    if (!stripePriceId) {
      throw new Error("Stripe Price Id not found");
    }
  }

  //Create Invoice
  const payloadInvoice: Prisma.InvoiceCreateInput = {
    user: {
      connect: {
        id: userId,
      },
    },
    type: InvoiceModelType.MEMBERSHIP,
    Items: {
      create: [
        {
          description: "Membership with Plan " + plan.name,
          name: plan.name ? plan.name : "Unknown",
          modelId: plan.id,
          modelType: "PLAN",
          pricingId: stripePriceId ? stripePriceId : null,
          pricingBdId: price.id,
          price: price.price * currency.rate,
          quantity: 1,
        },
      ],
    },
    Currency: {
      connect: {
        id: currency.id,
      },
    },
    details: "Buy Membership Plan " + plan.name,
    status: InvoiceStatus.PENDING,
    dueAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const invoice = await prisma.invoice.create({
    data: payloadInvoice,
  });

  return invoice;
};
