import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getSupportTicketById } from "@/actions/global/supportModule/get-support-ticket-by-id";
import ViewSupportTicketDetailsPage from "@/app/modules/supportModule/ViewSupportTicketPage";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: "View Ticket",
};

const ViewTicket = async ({ params }: { params: { id: string } }) => {
  const ticketIdStr = params.id || "";
  const ticketId = parseInt(ticketIdStr);
  const ticket = await getSupportTicketById(ticketId);
  const userDB = await getUserDB();
  const t = await getTranslations("AdminLayout.pages.support");
  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={t("viewTicketDetails")}
          breadcrumbs={[
            { name: t("dashboard"), href: "/home" },
            {
              name: t("support"),
              href: "/home/support",
            },
            { name: `${t("ticket")} ${ticket?.id}`, href: "#" },
          ]}
        />
        <ViewSupportTicketDetailsPage user={userDB} ticket={ticket} />
      </Suspense>
    </div>
  );
};

export default ViewTicket;
