import {
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export const adminNavigation = [
  {
    sectionName: "General",
    items: [
      { name: "Escritorio", href: "/home", icon: HomeIcon, current: true },
    ],
  },
  {
    sectionName: "Examples",
    items: [
      {
        name: "Example 1",
        href: "/home/services",
        icon: ShoppingBagIcon,
        current: false,
      },
    ],
  },
  {
    sectionName: "Facturación",
    items: [
      {
        name: "Wallet",
        href: "/home/wallet?currency=usd",
        icon: CreditCardIcon,
        current: true,
      },
      {
        name: "Facturas",
        href: "/home/invoices",
        icon: DocumentTextIcon,
        current: true,
      },
    ],
  },
];

import AdminHeader from "../ui/AdminHeader";
import { ReactNode } from "react";
import AdminSidebar from "../ui/AdminSidebar";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import FloatingWhatsAppButton from "../core/FloatingWhatsAppButton";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();

  return (
    <main className="relative text-primary">
      <AdminSidebar />
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <AdminHeader notificationsCount={notificationsCount} />
        <div className="py-3  ">
          <div className="mx-auto   px-4  ">{children}</div>
        </div>
      </div>{" "}
      <FloatingWhatsAppButton />
    </main>
  );
}
