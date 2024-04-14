import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getInvoiceDetails } from "@/actions/superAdmin/superAdminBillingModule/get-invoice-details";
import ViewInvoiceDetails from "../ui/ViewInvoiceDetails";
import { IInvoice } from "@/interfaces/billingModule";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "View Invoice Details",
};

const AdminViewInvoiceDetails = async ({
  params,
}: {
  params: { id: string };
}) => {
  const invoiceStr = params.id || "";
  const invoiceId = parseInt(invoiceStr);
  const invoice = await getInvoiceDetails(invoiceId);
  const t = await getTranslations("AdminLayout");

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={t("pages.invoices.viewInvoiceDetails")}
          breadcrumbs={[
            { name: t("dashboard"), href: "/home" },
            {
              name: "Invoices",
              href: "/home/invoices",
            },
            { name: `Invoice ${invoice?.id}`, href: "#" },
          ]}
        />

        <ViewInvoiceDetails invoice={invoice as IInvoice} />
      </Suspense>
    </div>
  );
};

export default AdminViewInvoiceDetails;
