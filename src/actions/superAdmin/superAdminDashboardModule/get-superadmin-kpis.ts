"use server";

import prisma from "@/lib/db";
interface ParamsTypes {
  args: {
    period: number;
  };
}
export const getSuperAdminKpis = async ({ args }: ParamsTypes) => {
  try {
    const period = args.period || 1;
    const kpis = await prisma.adminKpi.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - period * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const parsedKpis = kpis.map((kpi: any) => {
      const createdAt = kpi.createdAt.toLocaleDateString();
      return {
        ...kpi,
        createdAt: createdAt,
      };
    });

    return parsedKpis;
  } catch (error) {
    console.error(error);
    return error;
  }
};
