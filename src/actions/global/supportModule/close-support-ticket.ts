"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const closeSupportTicket = async (ticketId: number) => {
  await prisma.supportTicket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "CLOSED",
    },
  });

  

  revalidatePath("/support/ticket" + ticketId);
};
