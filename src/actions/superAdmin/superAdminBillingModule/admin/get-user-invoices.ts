"use server";
import prisma from "@/lib/db";
import { getUser } from "@/utils/facades/serverFacades/userFacade";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export const getUserInvoices = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  const limit = args.limit;
  const offset = args.offset;

  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  let whereSearch: Prisma.InvoiceWhereInput;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      OR: [
        {
          details: {
            contains: args.search,
          },
        },
        {
          id: parseInt(args.search),
        },
      ],
    };
  }

  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
      ...whereSearch,
    },
    skip: offset,
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      Items: true,
      Currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.membership.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//

export const getUserInvoicesPendingCount = async () => {
  const userClerk = auth();
  if (!userClerk) throw new Error("client clerk not found");
  const { userId } = await getUser(userClerk);

  const data = await prisma.invoice.count({
    where: {
      userId,
      status: "PENDING",
    },
  });

  return data;
};
