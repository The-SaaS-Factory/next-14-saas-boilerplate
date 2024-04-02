"use server";

import { getClientCustomer } from "@/utils/facades/serverFacades/paymentFacade";
import {
  stripeCreateInvoice,
  stripeCreateInvoiceItem,
} from "@/utils/facades/serverFacades/stripeFacade";
import Stripe from "stripe";
import prisma from "@/lib/db";
import { InvoiceItem } from "@prisma/client";

export const createStripeInvoice = async (invoiceId: number) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        user: true,
        Currency: true,
        Items: true,
      },
    });

    if (!invoice) throw new Error("Invoice not found");

    if (!invoice.user?.id) throw new Error("Client Reference Id not found");

    const client = await getClientCustomer(invoice.user.id);

    if (!client?.customerId) throw new Error("Stripe Customer not found");
    const dueDate = invoice.dueAt
      ? invoice.dueAt.getTime()
      : new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    const payload: Stripe.InvoiceCreateParams = {
      collection_method: "send_invoice",
      due_date: Math.floor(dueDate / 1000),
      description: invoice.details
        ? invoice.details
        : "Payment for invoice" + invoice.id,
      customer: client?.customerId ? client.customerId : undefined,
      currency: invoice.Currency.code.toLowerCase(),
    };

    const stripeInvoice = await stripeCreateInvoice(payload);

    if (!stripeInvoice) throw new Error("Stripe Invoice not created");

    await Promise.all(
      invoice.Items.map(async (item: InvoiceItem) => {
        const payload = {
          customer: client.customerId,
          description: item.description ? item.description : item.name,
          amount: item.price * 100,
          currency: invoice.Currency.code.toLowerCase(),
          invoice: stripeInvoice.id,
        };

        await stripeCreateInvoiceItem(payload).catch((err) => {
          console.log(err);
        });
      })
    )
      .then(async () => {})
      .catch((err) => {
        console.log(err);
        throw new Error("Stripe Invoice Items not created");
      });

    await prisma.invoice.update({
      where: {
        id: invoice.id,
      },
      data: {
        gateway: "stripe",
        userCustomerExternalId: client.customerId,
        invoiceUrl: stripeInvoice.hosted_invoice_url,
        invoicePdfUrl: stripeInvoice.invoice_pdf,
      },
    });

    return stripeInvoice;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
