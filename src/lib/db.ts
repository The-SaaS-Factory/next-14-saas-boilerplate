/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton: () => PrismaClient = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
 