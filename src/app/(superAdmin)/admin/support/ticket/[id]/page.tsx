import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import ViewSupportTicketDetailsPage from "@/app/modules/supportModule/ViewSupportTicketPage";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getSupportTicketDetails } from "@/actions/global/supportModule/admin/get-support-ticket-details";

export const metadata: Metadata = {
  title: "View Ticket",
};

const SuperAdminViewTicket = async ({ params }: { params: { id: string } }) => {
  const ticketIdStr = params.id || "";
  const ticketId = parseInt(ticketIdStr);
  const ticket = await getSupportTicketDetails(ticketId);
  const userDB = await getUserDB();
  return (
    <div>
      <PageName
        name={"View Ticket"}
        breadcrumbs={[
          { name: "Dashboard", href: "/admin" },
          {
            name: "Support",
            href: "/admin/support",
          },
          { name: `Ticket ${ticket?.id}`, href: "#" },
        ]}
      />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <ViewSupportTicketDetailsPage user={userDB} ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default SuperAdminViewTicket;
