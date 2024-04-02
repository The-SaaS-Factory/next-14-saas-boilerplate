"use server";
import prisma from "@/lib/db";

export const getAllSuperAdminSettings = async () => {
  return {
    data: await prisma.superAdminSetting.findMany({}),
  };
};
