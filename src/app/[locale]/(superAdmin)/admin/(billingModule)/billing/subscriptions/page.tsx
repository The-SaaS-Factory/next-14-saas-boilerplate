import PageName from "@/components/ui/commons/PageName";
import React from "react";
import SubscriptionsList from "./ui/SubscriptionsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
};

const SuperAdminBillingSuscriptionsModule = ({
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
        name={"Subscriptions"}
        btn1={{
          href: "subscriptions/add",

          name: "Add",
        }}
        breadcrumbs={[
          { name: "Dashboard", href: "/admin" },
          { name: "Subscriptions", href: "/admin/billing/subscriptions" },
        ]}
      />
      <SubscriptionsList query={query} currentPage={currentPage} />
    </div>
  );
};

export default SuperAdminBillingSuscriptionsModule;
