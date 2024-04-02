"use server";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

export const getSupportTicketById = async (ticketId: number): Promise<any> => {
  if (!ticketId) throw new Error("Ticket id is required");

  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");

  const { userId } = await getUser(userClerk);

  let whereOwner: Prisma.SupportTicketWhereInput;

  whereOwner = {
    userId: userId,
  };

  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      ...whereOwner,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      SupportTicketMessage: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
              email: true,
            },
          },

          SupportTicketMessageContent: true,
        },
      },
    },
  });

  return ticket;
};
