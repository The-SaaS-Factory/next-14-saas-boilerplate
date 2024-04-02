"use server";
import prisma from "@/lib/db";

export const getPaymentMethodDetails = async (paymentMethodId: number) => {
  try {
    const paymentMethodDetails = await prisma.paymentMethod.findFirst({
      where: {
        id: paymentMethodId,
      },
    });

    return paymentMethodDetails;
  } catch (error) {
    console.log(error);

    return {
      errors: [error],
    };
  }
};
