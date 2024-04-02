import { frequencyType } from "@prisma/client";

export const pricings = [
  {
    planId: 1,
    price: 5,
    frequency: frequencyType.MONTHLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    planId: 1,
    price: 50,
    frequency: frequencyType.YEARLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    planId: 2,
    price: 7,
    frequency: frequencyType.MONTHLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    planId: 2,
    price: 55,
    frequency: frequencyType.YEARLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    planId: 3,
    price: 137,
    frequency: frequencyType.MONTHLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    planId: 3,
    price: 80,
    frequency: frequencyType.YEARLY,
    status: "ACTIVE",
    oldPrice: 0,
    serviceId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const paymentsMethods = [
  {
    name: "Stripe",
    currencies: JSON.stringify(["1", "2"]),
    status: "ACTIVE",
  },
];
