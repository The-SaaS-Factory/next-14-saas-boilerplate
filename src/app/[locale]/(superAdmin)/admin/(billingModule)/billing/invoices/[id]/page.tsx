import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getInvoiceDetails } from "@/actions/superAdmin/superAdminBillingModule/get-invoice-details";
import { IInvoice } from "@/interfaces/billingModule";
import OperateInvoiceAsSuperAdmin from "../ui/OperateInvoiceAsSuperAdmin";
import {
  DocumentChartBarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import TabsClientSide from "@/components/core/TabsClientSide";
import ViewInvoiceDetails from "@/app/[locale]/(admin)/home/invoices/ui/ViewInvoiceDetails";

export const metadata: Metadata = {
  title: "View Invoice Details",
};

const SuperAdminViewInvoiceDetails = async ({
  params,
}: {
  params: { id: string };
}) => {
  const invoiceStr = params.id || "";
  const invoiceId = parseInt(invoiceStr);
  const invoice = await getInvoiceDetails(invoiceId);

  if (!invoice) return <div>Invoice not found</div>;

  const tabs = [
    {
      key: "details",
      label: "Detalles",
      icon: <DocumentChartBarIcon className="w-5 h-5" />,
      children: <ViewInvoiceDetails invoice={invoice as IInvoice} />,
    },
    {
      key: "addItem",
      label: "Administrar factura",
      icon: <PencilIcon className="w-5 h-5" />,
      children: <OperateInvoiceAsSuperAdmin invoice={invoice} />,
    },
  ];

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <PageName
          name={"Detalles de la factura"}
          breadcrumbs={[
            { name: "Dashboard", href: "/admin" },
            {
              name: "Invoices",
              href: "/admin/billing/invoices",
            },
            { name: `Invoice ${invoice?.id}`, href: "#" },
          ]}
        />
        <div className=" ">
          <TabsClientSide tabs={tabs} />
        </div>
      </Suspense>
    </div>
  );
};

export default SuperAdminViewInvoiceDetails;
