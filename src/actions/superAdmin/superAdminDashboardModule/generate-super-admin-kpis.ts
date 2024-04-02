"use server";
import prisma from "@/lib/db";
import { getTotalInvoiceAmount } from "@/utils/facades/serverFacades/adminFacade";

export const generateSuperAdminKpis = async () => {
  await prisma.adminKpi.create({
    data: {
      name: "user_count_total",
      type: "counts",
      value: await prisma.user.count(),
    },
  });


  await prisma.adminKpi.create({
    data: {
      name: "memberships_revenue",
      type: "counts",
      value: await getTotalInvoiceAmount(),
    },
  });

  await prisma.adminKpi.create({
    data: {
      name: "memberships_actived_count_total",
      type: "counts",
      value: await prisma.membership.count(),
    },
  });

  return true;
};
