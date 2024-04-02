"use server";
import prisma from "@/lib/db";
import { sendInternalNotificatoin } from "@/utils/facades/serverFacades/notificationFacade";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { PublicationContentType } from "@prisma/client";
import { revalidatePath } from "next/cache";
export const addMessageSupportTicket = async (args: any) => {
  return await prisma.$transaction(async (tx: any) => {
    try {
      const userClerk = auth();
      if (!userClerk) throw new Error("client clerk not found");
      const { userId } = await getUser(userClerk);

      let dataForMessage = {};

      dataForMessage = {
        userId: userId,
      };

      const message = await tx.supportTicketMessage.create({
        data: {
          ticketId: args.ticketId,
          ...dataForMessage,
        },
      });

      let contents: any = [];

      const images = args.images && JSON.parse(args.images);

      if (images && images.length > 0) {
        contents = await Promise.all(
          images.map(async (image: any) => {
            let data = image.url;

            return {
              messageId: message.id,
              content: data,
              type: PublicationContentType.GALLERY,
            };
          })
        );
      }

      const description = {
        messageId: message.id,
        content: args.description,
        type: PublicationContentType.TEXT,
      };

      contents.push(description);

      if (contents) {
        await tx.supportTicketMessageContent.createMany({
          data: contents,
        });
      }

      const ticket = await tx.supportTicket.findUnique({
        where: {
          id: args.ticketId,
        },
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      if (ticket.userId !== userId) {
        sendInternalNotificatoin(
          userId,
          `You have a new message in your ticket #${ticket.id}`
        );

        await prisma.supportTicket.update({
          where: {
            id: args.ticketId,
          },
          data: {
            status: "AWAITING_RESPONSE",
          },
        });
      }

      revalidatePath("/home/support/ticket" + args.ticketId);

      return message;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  });
};
