"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

export const getAllSuscriptions = async ({
  args,
}: {
  args: {
    limit: number;
    offset: number;
    search: string;
  };
}) => {
  let whereSearch: Prisma.MembershipWhereInput;
  const limit = args.limit;
  const offset = args.offset;

  whereSearch = {};

  if (args.search) {
    whereSearch = {
      user: {
        name: {
          contains: args.search,
        },
      },
    };
  }
  const data = await prisma.membership.findMany({
    where: {
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
      plan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.membership.count({
    where: whereSearch,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//
