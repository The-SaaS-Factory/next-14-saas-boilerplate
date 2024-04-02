import { ScopeType, Status } from "@prisma/client";

export const modules = [
  {
    name: "Super Admin - Aministration",
    description: "Dashboard, Kpis, Users, Organizations, General Data",
    scope: ScopeType.SUPERADMIN,
    status: Status.ACTIVE,
  },
  {
    name: "Super Admin - Settings",
    scope: ScopeType.SUPERADMIN,
    status: Status.ACTIVE,
  },
  {
    name: "Super Admin - Support Suite",
    scope: ScopeType.SUPERADMIN,
    status: Status.ACTIVE,
  },
  {
    name: "Super Admin - Billing System",
    scope: ScopeType.SUPERADMIN,
    status: Status.ACTIVE,
  },
  {
    name: "Admin - Support Tickets",
    scope: ScopeType.ADMIN,
    status: Status.ACTIVE,
  },
];
