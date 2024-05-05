import Stripe from "stripe";
import { getSuperAdminSetting } from "./adminFacade";
import {
  invoiceItemPaid,
  processInvoiceItemInPayment,
  saveStripeCustomerId,
  stripeEventPaymentFailed,
  updateInvoice,
} from "./paymentFacade";
import prisma from "@/lib/db";
import { getPricingByStripePricingId } from "./paymentFacade";
import { StripeCustomer } from "@prisma/client";

type ClientSessionPayloadType = {
  customerId: string;
  userId: number | null;
};

const makeStripeClient = async () => {
  const stripeMode = await getSuperAdminSetting("STRIPE_MODE");
  const STRIPE_CLIENT_SECRET_PRODUCTION = await getSuperAdminSetting(
    "STRIPE_CLIENT_SECRET_PRODUCTION"
  );
  const STRIPE_CLIENT_SECRET_SANDBOX = await getSuperAdminSetting(
    "STRIPE_CLIENT_SECRET_SANDBOX"
  );

  const stripeSectret =
    stripeMode === "prod"
      ? STRIPE_CLIENT_SECRET_PRODUCTION
      : STRIPE_CLIENT_SECRET_SANDBOX;

  if (!stripeSectret) throw new Error("Stripe secret not found");

  return new Stripe(stripeSectret, { apiVersion: "2023-10-16" });
};

// eslint-disable-next-line no-unused-vars
export const stripeWebhook = async (requestBody: any) => {
  const stripe = await makeStripeClient();
  const payload = requestBody;

  const endpointSecret = await getSuperAdminSetting("STRIPE_ENDPOINT_SECRET");
  const secret = endpointSecret;

  if (!secret) throw new Error("Stripe secret not found");

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payload,
    secret,
  });

  const event = stripe.webhooks.constructEvent(payload, header, secret);
  const eventData = event.data.object as Stripe.PaymentIntent;

  try {
    switch (event.type) {
      case "invoice.paid":
        await stripeEventInvoicePaid(eventData); //Second
        break;
      case "payment_intent.payment_failed":
        await stripeEventPaymentFailed(eventData);
        break;
      case "checkout.session.completed":
        await stripeEventCheckoutCompleted(eventData); //First
        break;

      default:
        break;
    }

    return "ok";
  } catch (err: any) {
    return `Webhook Error: ${err.message}`;
  }
};

export const stripeGetClientByCustomerId = async (customerId: string) => {
  const client = await prisma.stripeCustomer.findFirst({
    where: {
      customerId: customerId,
    },
  });

  return client;
};

export const stripeEventInvoicePaid = async (eventData: any) => {
  try {
    await Promise.all(
      eventData.lines.data.map(async (line: any) => {
        const priceId = line.price.id;
        const pricing = await getPricingByStripePricingId(priceId);

        await invoiceItemPaid({ stripePriceId: priceId, pricing, eventData });
      })
    );

    return "ok";
  } catch (error) {
    console.log(error);
  }
};

export const stripeRetriveSubscription = async (subscriptionId: string) => {
  const stripe = await makeStripeClient();
  return await stripe.subscriptions.retrieve(subscriptionId);
};
export const stripeRetriveInvoice = async (invoiceId: string) => {
  const stripe = await makeStripeClient();
  return await stripe.invoices.retrieve(invoiceId);
};

export const stripeEventCheckoutCompleted = async (eventData: any) => {
  try {
    const invoiceId = eventData.client_reference_id;

    if (invoiceId) {
      const invoice = await prisma.invoice.findUnique({
        where: { id: Number(invoiceId) },
        include: { Items: true, Currency: true },
      });

      if (!invoice) throw new Error("Invoice not found");

      const payload = {
        gateway: "stripe",
        invoicePdfUrl: eventData.invoice_pdf,
        gatewayId: eventData.id,
        invoiceUrl: eventData.hosted_invoice_url,
        subscriptionExternalId: eventData.subscription,
      };

      await updateInvoice(invoice.id, payload);

      //**************************************************************MAIN************************************************** */
      Promise.all(
        invoice.Items.map(async (item: any) => {
          if (item.pricingId) {
            const pricing = await getPricingByStripePricingId(item.pricingId);
            await processInvoiceItemInPayment(item, invoice, pricing);
          } else {
            await processInvoiceItemInPayment(item, invoice);
          }
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const stripeCreateProduct = async (
  productPayload: Stripe.ProductCreateParams
) => {
  const stripe = await makeStripeClient();

  if (stripe) {
    const product = await stripe.products.create({
      name: productPayload.name,
    });

    return product.id;
  }

  return null;
};

export const stripeCreatePlan = async (
  productId: string,
  planPayload: Stripe.PlanCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.plans.create({
    amount: planPayload.amount ?? 1 * 100,
    currency: planPayload.currency,
    interval: planPayload.interval,
    product: productId,
  });
};

export const stripeCreateCoupon = async (
  couponPayload: Stripe.CouponCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.coupons.create(couponPayload);
};

export const stripeCreateCustomer = async (customerPayload: any) => {
  try {
    const stripe = await makeStripeClient();
    // const paymentMethod = await stripCreatePaymentMethod();

    // if (!paymentMethod) throw new Error("Error creating payment method");

    return await stripe.customers.create({
      name: customerPayload.name ?? null,
      email: customerPayload.email ?? null,
      // payment_method: paymentMethod.id,
      // invoice_settings: {
      //   default_payment_method: paymentMethod.id,
      // },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const stripCreatePaymentMethod = async () => {
  try {
    const stripe = await makeStripeClient();
    return await stripe.paymentMethods.create({
      type: "card",
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const stripeCreateCheckoutSession = async ({
  items,
  coupons,
  clientPayload,
  referenceId,
  modelName,
  mode = "subscription",
}: {
  items: Stripe.Checkout.SessionCreateParams.LineItem[];
  coupons: Stripe.Checkout.SessionCreateParams.Discount[];
  clientPayload: ClientSessionPayloadType;
  referenceId: string;
  modelName: string;
  mode?: "subscription" | "payment";
}) => {
  try {
    const stripe = await makeStripeClient();
    const urls = await getUrlsForRedirect(modelName);
    console.log("urls", urls);
    
    
    let sessionPayload: Stripe.Checkout.SessionCreateParams = {
      line_items: items,
      client_reference_id: referenceId,
      mode: mode,
      discounts: coupons,
      metadata: {
        modelId: clientPayload.userId,
      },
      ...urls,
      customer: clientPayload.customerId,
    };

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUrlsForRedirect = async (modelName: string = 'PLAN') => {
  const domain = await getSuperAdminSetting("PLATFORM_FRONTEND_URL");

  if (modelName === "PLAN") {
    return {
      success_url: `${domain}/home/settings/billing/planActive?paymentStatus=success`,
      cancel_url: `${domain}/home/settings/billing/buyPlan?paymentStatus=error`,
    };
  } else if (modelName === "SERVICE") {
    return {
      success_url: `${domain}/home/services?paymentStatus=success`,
      cancel_url: `${domain}/home/services?paymentStatus=error`,
    };
  }
};
export const createStripeCustomer = async (customerPayload: {
  name: string;
  email: string;
  userId: number;
}): Promise<StripeCustomer> => {
  const customer = await stripeCreateCustomer({
    name: customerPayload.name,
    email: customerPayload.email,
  });

  if (!customer) throw new Error("Error creating customer");
  const customerInBd = saveStripeCustomerId(
    customerPayload.userId,
    customer.id
  );
  return customerInBd;
};

export const stripeCreateSuscription = async (
  subscriptionPayload: Stripe.SubscriptionCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.subscriptions.create(subscriptionPayload);
};

export const stripeCreateInvoice = async (
  invoicePayload: Stripe.InvoiceCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.invoices.create(invoicePayload);
};

export const stripeCreateInvoiceItem = async (
  invoiceItemPayload: Stripe.InvoiceItemCreateParams
) => {
  const stripe = await makeStripeClient();

  return await stripe.invoiceItems.create(invoiceItemPayload);
};
