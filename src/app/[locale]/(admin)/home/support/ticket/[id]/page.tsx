import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getSupportTicketById } from "@/actions/global/supportModule/get-support-ticket-by-id";
import ViewSupportTicketDetailsPage from "@/app/modules/supportModule/ViewSupportTicketPage";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";

export const metadata: Metadata = {
  title: "View Ticket",
};

const ViewTicket = async ({ params }: { params: { id: string } }) => {
  const ticketIdStr = params.id || "";
  const ticketId = parseInt(ticketIdStr);
  const ticket = await getSupportTicketById(ticketId);
  const userDB = await getUserDB();
  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={"View Ticket"}
          breadcrumbs={[
            { name: "Dashboard", href: "/home" },
            {
              name: "Support",
              href: "/home/support",
            },
            { name: `Ticket ${ticket?.id}`, href: "#" },
          ]}
        />
        <ViewSupportTicketDetailsPage user={userDB} ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default ViewTicket;
