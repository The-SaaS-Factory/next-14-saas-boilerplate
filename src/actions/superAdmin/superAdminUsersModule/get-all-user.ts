"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAllUser = async ({
  args,
}: {
  args: {
    limit?: number;
    offset?: number;
    search?: string;
  };
}) => {
  let whereSearch: Prisma.UserWhereInput;
  const limit = args.limit || 1000;
  const offset = args.offset;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      name: {
        contains: args.search,
      },
    };
  }

  const data = await prisma.user.findMany({
    where: {
      ...whereSearch,
    },
    skip: offset,
    take: limit,
    include: {
      Membership: {
        select: {
          endDate: true,
          plan: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.user.count({
    where: { name: { contains: args.search } },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
