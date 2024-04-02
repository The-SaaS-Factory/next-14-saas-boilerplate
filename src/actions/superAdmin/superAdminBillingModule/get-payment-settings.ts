"use server";
import prisma from "@/lib/db";
export const getPaymentSettings = async () => {
  const settings = await prisma.superAdminSetting.findMany({
    where: {
      settingName: {
        in: [
          "QVAPAY_CLIENT_ENABLED",
          "QVAPAY_MODE",
          "STRIPE_CLIENT_ENABLED",
          "STRIPE_MODE",
          "STRIPE_CLIENT_PK_PRODUCTION",
          "STRIPE_CLIENT_PK_SANDBOX",
        ],
      },
    },
  });
  return { data: settings };
};
