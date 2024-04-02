"use server";
import {  InvoiceItemType } from "@/interfaces/billingModule";
import prisma from "@/lib/db";

export const generateKpi = async () => {
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


export async function getTotalInvoiceAmount() {
  const invoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
    },
    select: {
      Items: {
        select: {
          price: true,
          quantity: true,
        },
      },
    },
  });
  let total = 0;

  invoices.forEach((invoice: any) => {
    invoice.Items?.forEach((item: InvoiceItemType) => {
      total += item.price * item.quantity;
    });
  });

  return total;
}


export const getCurrencyIdByCode = async (code: string) => {
  const currency = await prisma.adminCurrencies.findFirst({
    where: {
      code: code,
    },
  });

  return currency ? currency.id : null;
};

export const getSuperAdminSetting = async (settingName: string) => {
  const setting = await prisma.superAdminSetting.findFirst({
    where: {
      settingName: settingName,
    },
  });

  return setting ? setting.settingValue : null;
};

export const getAdminSettingValue = async (
  settingName: string,
  value: string
) => {
  const setting = await prisma.userSetting.findFirst({
    where: {
      settingName: settingName,
      settingValue: value,
    },
  });

  return setting ? setting : null;
};

