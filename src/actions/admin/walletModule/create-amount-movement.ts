"use server";
import prisma  from "@/lib/db";
import { AdminCurrencies, MovementAmountType } from "@prisma/client";


/**
 *
 * 1- Create movement
 * 2- Update the user's / organization balance by amount
 * * */

export const createMovementAmountForUser = async ({
  amount,
  currencyId,
  userId,
  details,
  type,
}: {
  amount: number;
  currencyId: number;
  userId: number;
  details: string;
  type: MovementAmountType;
}) => {
  return prisma.$transaction(async (tx: any) => {
    let userAmount: any = null;

    userAmount = await tx.userAmounts.findFirst({
      where: {
        userId: userId,
        currencyId: currencyId,
      },
    });

    if (!userAmount) {
      userAmount = await createAmountByDefaultForUser({
        userId,
        currencyId,
      });
    }

    return prisma.$transaction(async (tx: any) => {
      //Create movement
      await tx.adminMovementsAmounts.create({
        data: {
          amount,
          currencyId,
          userId,
          details: details,
          type: type,
        },
      });

      // 3. Update the user's balance by amount
      if (type === MovementAmountType.DEBIT) {
        const balance = await tx.userAmounts.update({
          data: {
            amount: {
              decrement: amount,
            },
          },
          where: {
            id: userAmount?.id || 0,
          },
        });

        if (balance.amount < 0) {
          throw new Error(`${userId} doesn't have enough to send ${amount}`);
        }
      } else if (type === MovementAmountType.CREDIT) {
        await tx.userAmounts.update({
          data: {
            amount: {
              increment: amount,
            },
          },
          where: {
            id: userAmount?.id || 0,
          },
        });
      }
    });
  });
};

export const createAmountByDefaultForUser = async ({
  userId,
  currencyId,
}: {
  userId: number;
  currencyId?: number;
}) => {
  const currencies = await prisma.adminCurrencies.findMany({});

  //For each currency create an amount in 0 if not exist
  //Use Promise.all to create all in parallel
  await Promise.all(
    currencies.map(async (currency: AdminCurrencies) => {
      const amount = await prisma.userAmounts.findFirst({
        where: {
          userId: userId,
          currencyId: currency.id,
        },
      });

      await prisma.userAmounts.upsert({
        where: {
          id: amount?.id || 0,
        },
        update: {},
        create: {
          amount: 0,
          currencyId: currency.id,
          userId: userId,
        },
      });
    })
  );

  if (!currencyId) return;

  return await prisma.userAmounts.findFirst({
    where: {
      userId: userId,
      currencyId: currencyId,
    },
  });
};
