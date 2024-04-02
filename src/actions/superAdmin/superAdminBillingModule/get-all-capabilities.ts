"use server";
import prisma from "@/lib/db";
export const getAllCapabilities = async () => {
  return await prisma.capabilitie.findMany();
};
