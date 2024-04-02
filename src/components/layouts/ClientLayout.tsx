import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export const clientNavigation = [
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
];

import { ReactNode } from "react";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";
import FloatingWhatsAppButton from "../core/FloatingWhatsAppButton";
import ClientHeader from "../ui/ClientHeader";
import ClientSidebar from "../ui/ClientSidebar";

export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notificationsCount = await getUserNotificationsUnreadCount();

  return (
    <main className="relative text-primary">
      <ClientSidebar />
      <div className="lg:pl-72 h-screen overflow-y-auto relative bg-main">
        <ClientHeader notificationsCount={notificationsCount} />
        <div className="py-3  ">
          <div className="mx-auto   px-4  ">{children}</div>
        </div>
      </div>{" "}
      <FloatingWhatsAppButton />
    </main>
  );
}
