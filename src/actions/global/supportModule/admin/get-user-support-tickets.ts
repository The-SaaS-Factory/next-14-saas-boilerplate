"use server";
import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export const getUserSupportTickets = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  const { offset, limit } = args;

  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  let whereSearch: Prisma.SupportTicketWhereInput;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      subject: {
        contains: args.search,
      },
    };
  }

  let whereOwner: Prisma.SupportTicketWhereInput;

  whereOwner = {
    userId: userId,
  };

  const data = await prisma.supportTicket.findMany({
    where: {
      ...whereOwner,
      ...whereSearch,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          avatar: true,
          name: true,
        },
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.supportTicket.count({
    where: { ...whereSearch },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};

export const getSupportTicketsActivesCount = async () => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  let whereOwner: Prisma.SupportTicketWhereInput;

  whereOwner = {
    userId: userId,
  };

  const data = await prisma.supportTicket.count({
    where: {
      ...whereOwner,
      status: "OPEN",
    },
  });

  return data;
};
