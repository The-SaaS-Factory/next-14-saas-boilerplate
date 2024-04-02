"use server";

import { stripeCreateProduct } from "@/utils/facades/serverFacades/stripeFacade";
import prisma from "@/lib/db";
import { Plan   } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const connectProductWithStripe = async (
  modelName: string,
  productPayload: {
    id: number;
    name: string;
  }
) => {
  let model: | Plan | null = null;

  const stripeProductId: string | null = await stripeCreateProduct({
    name: productPayload.name,
  });

    if (modelName === "Plan") {
    model = await prisma.plan.findUnique({
      where: {
        id: productPayload.id,
      },
    });

    if (!model) throw new Error("Model not found");

    await prisma.plan.update({
      where: {
        id: productPayload.id,
      },
      data: {
        stripeProductId: stripeProductId,
      },
    });
  }

  if (!stripeProductId) throw new Error("Stripe Product not created");

  if (modelName === "Service") {
    revalidatePath(`/admin/services`);
  } else if (modelName === "Plan") {
    revalidatePath(`/admin/billing/plans/plans/edit/${productPayload.id}`);
  }
};
