import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import SupportTicketsList from "./ui/SupportTicketsList";
import SlideOver from "@/components/core/SlideOver";
import NewTicketSupportForm from "./ui/NewTicketSupportForm";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Support",
};

const AdminSupportPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const t = useTranslations("AdminLayout.pages.support");

  return (
    <div>
      <PageName
        name={t("support")}
        breadcrumbs={[
          { name: t("dashboard"), href: "/home" },
          { name: t("support"), href: "/home/support" },
        ]}
        btn2={
          <SlideOver
            button={{
              name: t("newTicket"),
            }}
          >
            <NewTicketSupportForm />
          </SlideOver>
        }
      />
      <Search placeholder={t("searchTicketByID")} />
      <Suspense
        key={query + Math.random}
        fallback={<TableLoaderSkeleton count={10} />}
      >
        <SupportTicketsList query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default AdminSupportPage;
