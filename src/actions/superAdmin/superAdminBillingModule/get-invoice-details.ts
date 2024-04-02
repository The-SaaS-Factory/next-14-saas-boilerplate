"use server";

import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { hasPermission } from "@/utils/facades/serverFacades/scurityFacade";

export const getInvoiceDetails = async (invoiceId: number) => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");

  const { userId, permissions } = await getUser(userClerk);

  let ANDQUERY: Prisma.InvoiceWhereInput[] = [];

  if (hasPermission(permissions, "superAdmin:billing:read")) {
    ANDQUERY = [
      {
        id: invoiceId,
      },
    ];
  } else {
    ANDQUERY = [
      {
        id: invoiceId,
        userId,
      },
    ];
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      AND: ANDQUERY,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      Currency: true,
      coupons: true,
      Items: true,
    },
  });

  return invoice;
};
