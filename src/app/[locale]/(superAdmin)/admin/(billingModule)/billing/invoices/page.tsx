import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import InvoicesList from "./ui/InvoicesList";
import Search from "@/components/ui/commons/Search";

export const metadata: Metadata = {
  title: "Invoices",
};

const SuperAdminBillingInvoicesModule = ({
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
      <PageName name={"Invoices"} />
      <Search placeholder="Search invoice for ID, organization or client" />
      <InvoicesList query={query} currentPage={currentPage} />
    </div>
  );
};

export default SuperAdminBillingInvoicesModule;
