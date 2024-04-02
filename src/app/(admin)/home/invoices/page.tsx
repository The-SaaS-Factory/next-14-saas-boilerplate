import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import InvoicesList from "./ui/InvoicesList";

export const metadata: Metadata = {
  title: "Invoices",
};

const AdminBillingInvoicesModule = ({
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
      <PageName name={"Facturas"} />
      <InvoicesList query={query} currentPage={currentPage} />
    </div>
  );
};

export default AdminBillingInvoicesModule;
