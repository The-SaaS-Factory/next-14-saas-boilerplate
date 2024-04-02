import { capabilities, planCapabilities, plans } from "./seeds/plans";
import { settings } from "./seeds/platform";
import { currencies } from "./seeds/currenciess";
import { permissions } from "./seeds/permissions";
import { modules } from "./seeds/modules";
import { PrismaClient } from "@prisma/client";
import { paymentsMethods, pricings } from "./seeds/pricing";

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction(async (tx: any) => {
    await tx.permission.createMany({
      data: permissions,
    });
    await tx.module.createMany({
      data: modules,
    });

    await tx.adminCurrencies.createMany({
      data: currencies,
    });

    await tx.capabilitie.createMany({
      data: capabilities,
    });
    await tx.plan.createMany({
      data: plans,
    });
    await tx.planCapabilities.createMany({
      data: planCapabilities,
    });
    await tx.superAdminSetting.createMany({
      data: settings,
    });
    await tx.pricing.createMany({
      data: pricings,
    });

    await tx.paymentMethod.createMany({
      data: paymentsMethods,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
