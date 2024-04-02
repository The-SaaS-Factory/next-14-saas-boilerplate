"use server";

import {
  processInvoiceItemInPayment,
  updateInvoice,
} from "@/utils/facades/serverFacades/paymentFacade";
import prisma from "@/lib/db";
import { InvoiceItem } from "@prisma/client";
import { checkPermission } from "@/utils/facades/serverFacades/scurityFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
const scope = "superAdmin:billing:upsert";

export const makeInvoicePaid = async (
  invoiceId: number,
  gateway = "manualAdmin"
) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { permissions } = await getUser(userClerk);

  if (gateway === "manualAdmin") {
    //Is from Admin
    checkPermission(permissions, scope);
  }

  const payload = {
    gateway,
  };

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      Items: true,
    },
  });

  if (!invoice) throw new Error("Invoice not found");

  await Promise.all(
    invoice.Items.map(async (invoiceItem: InvoiceItem) => {
      const pricing = await prisma.pricing.findFirst({
        where: {
          id: invoiceItem.pricingBdId ?? 0,
        },
      });

      if (pricing) {
        return await processInvoiceItemInPayment(invoiceItem, invoice, pricing);
      } else {
        return await processInvoiceItemInPayment(invoiceItem, invoice);
      }
    })
  )
    .then(async () => {
      await updateInvoice(invoice.id, payload);
    })
    .catch((error) => {
      throw new Error(error.message);
    });

    revalidatePath("admin/billing/invoices");
    revalidatePath(`admin/billing/invoices/${invoiceId}`);
};
