"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteInvoice = async (invoiceId: number) => {
  await prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  });

  revalidatePath("/admin/billing/invoices");

  redirect("/admin/billing/invoices");
};
