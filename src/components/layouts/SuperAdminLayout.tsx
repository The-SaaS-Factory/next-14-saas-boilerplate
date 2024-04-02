import {
  DocumentTextIcon,
  HomeIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import SuperAdminHeader from "../ui/SuperAdminHeader";
import { ReactNode } from "react";
import SuperAdminSidebar from "../ui/SuperAdminSidebar";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";

export const superAdminNavigation = [
  {
    sectionName: "General",
    items: [
      { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
      {
        name: "Users",
        href: "/admin/users",
        icon: UsersIcon,
        current: false,
      },
    ],
  },
  {
    sectionName: "Billing",
    items: [
      // {
      //   name: "Plans",
      //   href: "/admin/billing/plans/plans",
      //   icon: CreditCardIcon,
      //   current: true,
      // },
      // {
      //   name: "Subscriptions",
      //   href: "/admin/billing/subscriptions",
      //   icon: BuildingLibraryIcon,
      //   current: false,
      // },
      {
        name: "Invoices",
        href: "/admin/billing/invoices",
        icon: DocumentTextIcon,
        current: false,
      },
      {
        name: "Cupones",
        href: "/admin/billing/coupons",
        icon: TicketIcon,
        current: false,
      },
    ],
  },
];

export default async function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();
  return (
    <main className="relative  text-primary">
      <SuperAdminSidebar />
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <SuperAdminHeader notificationsCount={notificationsCount} />
        <div className="py-3   ">
          <div className="mx-auto   px-4  ">{children}</div>
        </div>
      </div>{" "}
    </main>
  );
}
