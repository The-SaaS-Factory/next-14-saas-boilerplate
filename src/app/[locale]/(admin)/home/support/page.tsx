import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import SupportTicketsList from "./ui/SupportTicketsList";
import SlideOver from "@/components/core/SlideOver";
import NewTicketSupportForm from "./ui/NewTicketSupportForm";
import { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Soporte",
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

  return (
    <div>
      <PageName
        name={"Soporte"}
        breadcrumbs={[
          { name: "Escritorio", href: "/home" },
          { name: "Soporte", href: "/home/support" },
        ]}
        btn2={
          <SlideOver
            button={{
              name: "Nuevo Ticket",
            }}
          >
            <NewTicketSupportForm />
          </SlideOver>
        }
      />
      <Search placeholder="Busca por ticket ID" />
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
