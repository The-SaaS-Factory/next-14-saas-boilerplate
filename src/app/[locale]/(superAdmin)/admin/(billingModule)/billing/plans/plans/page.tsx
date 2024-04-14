import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import BillingPlansList from "./ui/BillingPlansList";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Plans",
};

const SuperAdminBillingPlansModulePage = () => {
  const t = useTranslations("AdminLayout.pages.plans");

  return (
    <div>
      <PageName
        name={t("plans")}
        isSubPage={true}
        btn1={{
          name: t("addPlan"),
          href: "plans/add",
        }}
      />
      <BillingPlansList />
    </div>
  );
};

export default SuperAdminBillingPlansModulePage;
