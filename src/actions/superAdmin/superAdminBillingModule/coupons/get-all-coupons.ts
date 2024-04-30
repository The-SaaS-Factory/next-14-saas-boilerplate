"use server";
import prisma from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";

export const getAllCoupons = async ({
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
          id:
            typeof findId === "string" && findId !== ""
              ? parseInt(findId ?? '0')
              : 0,
        },
        {
          name: {
            contains: args.search,
          },
        },
      ],
    };
  }

  const data = await prisma.coupon.findMany({
    skip: offset,
    take: limit,
    where: {
      ...whereSearch,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      invoices: {
        where: {
          status: InvoiceStatus.PAID,
        }
      },
      settings: true,
    },
  });

  const totalCount = await prisma.coupon.count();

  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
};
//
