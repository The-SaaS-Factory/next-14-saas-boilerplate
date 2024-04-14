
import SuperAdminHeader from "../ui/SuperAdminHeader";
import { ReactNode } from "react";
import SuperAdminSidebar from "../ui/SuperAdminSidebar";
import { getUserNotificationsUnreadCount } from "@/actions/global/notificationsModule/get-user-notifications";



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
