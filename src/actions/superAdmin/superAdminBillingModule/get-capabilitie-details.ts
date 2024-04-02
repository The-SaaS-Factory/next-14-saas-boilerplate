"use server";
import prisma from "@/lib/db";
export const getCapabilitieDetails = async (id: number) => {
  try {
    const capabilitie = await prisma.capabilitie.findUnique({
      where: {
        id,
      },
    });

    return capabilitie;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
