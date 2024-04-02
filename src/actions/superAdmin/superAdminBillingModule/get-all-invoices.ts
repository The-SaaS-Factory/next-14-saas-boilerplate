"use server";
import prisma from "@/lib/db";

export const getAllInvoices = async ({
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
  let whereSearch = {};

  let findId =
    typeof args.search === "string"
      ? args.search.replace(/\D/g, "")
      : args.search;


  if (args.search) {
    whereSearch = {
      OR: [
        {
          id:  (typeof findId === 'string' && findId !== '') ? parseInt(findId ?? 0) : 0
        },
        {
          Organization: {
            name: {
              contains: args.search,
            },
          },
        },
        {
           user: {
            name: {
              contains: args.search,
            },
          },
        },
      ],
    };
  }

  const data = await prisma.invoice.findMany({
    skip: offset,
    take: limit,
    where: {
      ...whereSearch,
    },
    include: {
       user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      coupons: true,
      Items: true,
      Currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.invoice.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//
