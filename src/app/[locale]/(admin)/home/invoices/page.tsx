import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import InvoicesList from "./ui/InvoicesList";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Invoices",
};

const AdminBillingInvoicesModule = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const t = await getTranslations("AdminLayout.pages.invoices");

  return (
    <div>
      <PageName name={t("invoices")} />
      <InvoicesList query={query} currentPage={currentPage} />
    </div>
  );
};

export default AdminBillingInvoicesModule;
