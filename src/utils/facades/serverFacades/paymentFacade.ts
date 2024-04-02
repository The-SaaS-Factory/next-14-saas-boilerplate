import { createStripeCustomer, stripeCreateProduct } from "./stripeFacade";
import { getAdminSettingValue, getSuperAdminSetting } from "./adminFacade";
import { updateMembership } from "./membershipFacade";
import {
  notifyToSuperAdmin,
  sendInternalNotificatoin,
} from "./notificationFacade";
import prisma from "@/lib/db";
import { ICoupon, InvoiceItemType } from "@/interfaces/billingModule";
import {
  Prisma,
  StripeCustomer,
  Plan,
  Pricing,
  Invoice,
  InvoiceStatus,
  InvoiceItem,
} from "@prisma/client";
import { parsePriceInLocalCurrency } from "../frontendFacades/parseValuesFacade";
 
import { getMonthCountByFrecuency } from "../modulesFacades/billingFacade";
import { payToAffiliate } from "./affiliatesSystemFacade";

export const createStripeServiceByDefault = async (serviceName: string) => {
  const existingSetting = await getSuperAdminSetting(serviceName);

  if (!existingSetting) {
    const productId = await stripeCreateProduct({ name: "Membership" });

    if (productId) {
      await prisma.superAdminSetting.create({
        data: {
          settingName: serviceName,
          settingValue: productId,
        },
      });
    }
  }
};

export const saveStripeCustomerId = async (
  userId: number,
  customerId: string
) => {
  return await prisma.stripeCustomer.create({
    data: {
      userId: userId,
      customerId: customerId,
    },
  });
};

export const getClientCustomer = async (userId: number) => {
  let client: StripeCustomer | null = null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  client = await prisma.stripeCustomer.findFirst({
    where: {
      userId,
    },
  });

  if (!client && user.email && user.name) {
    client = await createStripeCustomer({
      email: user.email,
      name: user.name,
      userId,
    });
  }

  return client;
};

export const createInvoice = async (
  invoicePayload: Prisma.InvoiceCreateInput
) => {
  return await prisma.invoice.create({
    data: invoicePayload,
  });
};

export const updateInvoice = async (
  invoiceId: number,
  payload: Prisma.InvoiceUpdateInput
) => {
  return await prisma.invoice
    .update({
      where: {
        id: invoiceId,
      },
      data: payload,
    })
    .catch((e: any) => console.log(e));
};

export const stripeEventPaymentFailed = async (eventData: any) => {
  const setting: any = getAdminSettingValue(
    "STRIPE_CUSTUMER_IR",
    eventData.customer
  );

  if (setting && setting.userId) {
    sendInternalNotificatoin(
      setting.userId,
      "Payment failed",
      eventData.last_payment_error.message
    );

    // notifyAdmin(
    //   "payment_failed",
    //   `Payment failed for user ${setting.userId}, message: ${eventData.last_payment_error.message}`
    // );
  }
};
// };

export const planPaid = async (
  plan: Plan,
  invoice: Invoice,
  pricing: Pricing
) => {
  let months = getMonthCountByFrecuency(pricing.frequency);

  if (!invoice.userId) throw new Error("User not found");

  const membership = await updateMembership({
    pricingId: pricing ? pricing.id : null,
    currencyId: invoice.currencyId,
    userId: invoice.userId,
    months,
    planId: plan.id,
  });

  const payload: Prisma.InvoiceUpdateInput = {
    paidAt: new Date(),
    status: InvoiceStatus.PAID,
    membershipId: membership.id,
  };

  if (invoice) {
    await updateInvoice(invoice?.id, payload);
    notifyToSuperAdmin(`New Plan Payment of ${pricing?.price}`);
  }
};

export const invoiceItemPaid = async ({
  stripePriceId,
  pricing,
  eventData,
}: {
  stripePriceId: string;
  pricing: Pricing;
  eventData: any;
}) => {
  try {
    const stripeCustomer = await prisma.stripeCustomer.findFirst({
      where: {
        customerId: eventData.customer,
      },
    });

    if (!stripeCustomer) throw new Error("Stripe customer not found");

    const lastsInvoceItem = await prisma.invoiceItem.findMany({
      where: {
        AND: [
          {
            pricingId: stripePriceId,
          },
          {
            Invoice: {
              userId: stripeCustomer.userId,
            },
          },
        ],
      },
      include: {
        Invoice: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    const invoiceItem = lastsInvoceItem[0];

    if (!invoiceItem) throw new Error("Invoice item not found");

    //Update partial invoice data
    const payload = {
      gateway: "stripe",
      invoicePdfUrl: eventData.invoice_pdf,
      gatewayId: eventData.id,
      invoiceUrl: eventData.hosted_invoice_url,
      subscriptionExternalId: eventData.subscription,
    };

    await updateInvoice(invoiceItem.Invoice.id, payload);

    //**************************************************************MAIN************************************************** */
    await processInvoiceItemInPayment(
      invoiceItem,
      invoiceItem.Invoice,
      pricing
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const processInvoiceItemInPayment = async (
  invoiceItem: InvoiceItem,
  invoice: Invoice,
  pricing?: Pricing
) => {
  /////////////////////userId - currency ///price/
  
  payToAffiliate(invoice, invoiceItem);

  if (invoiceItem.modelType === "PLAN") {
    if (!pricing) return;

    const plan = await prisma.plan.findUnique({
      where: {
        id: invoiceItem.modelId ? invoiceItem.modelId : 0,
      },
    });

    if (!plan) throw new Error("Plan not found");

    ////////////////////////////////////////////////////// CASHBACK
    return await planPaid(plan, invoice, pricing);
  } 
};

export const calculateInvoiceTotal = (
  items: InvoiceItemType[],
  coupons: ICoupon[]
) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity;
  });

  let totalDiscount = 0;

  const allPorcent = coupons
    ?.filter((c: ICoupon) => c.percentOff !== null)
    .reduce((acc, coupon) => {
      return acc + coupon.percentOff!;
    }, 0);

  const allAmount = coupons
    ?.filter((c: ICoupon) => c.amountOff !== null)
    .reduce((acc, coupon) => {
      return acc + coupon.amountOff!;
    }, 0);

  if (allAmount) {
    total = total - allAmount;
    totalDiscount += allAmount;
  }

  if (allPorcent) {
    const porcentAmount = (total * allPorcent) / 100;
    totalDiscount += porcentAmount;
    total = total - porcentAmount;
  }

  return { total, totalDiscount };
};

export const getInvoiceTotal = (
  items: InvoiceItemType[],
  currencyCode = "USD",
  coupons: ICoupon[]
) => {
  const { total, totalDiscount } = calculateInvoiceTotal(items, coupons);

  if (totalDiscount > 0) {
    return `${parsePriceInLocalCurrency(total, currencyCode)}  
     ${currencyCode.toUpperCase()} ${
      totalDiscount &&
      `- ${parsePriceInLocalCurrency(totalDiscount, currencyCode)} descontado`
    } `;
  } else {
    return `${parsePriceInLocalCurrency(total, currencyCode)}  
     ${currencyCode.toUpperCase()} `;
  }
};

export const getPricingByStripePricingId = async (pricingId: string) => {
  const setting = await prisma.pricingSetting.findFirst({
    where: {
      settingValue: pricingId,
    },
    include: {
      Pricing: true,
    },
  });

  if (!setting) {
    throw new Error("Setting Plan not found");
  }

  const pricing = await prisma.pricing.findUnique({
    where: {
      id: setting.pricingId as number,
    },
    include: {
      Plan: true,
    },
  });

  if (!pricing) {
    throw new Error("Pricing not found");
  }

  return pricing;
};
