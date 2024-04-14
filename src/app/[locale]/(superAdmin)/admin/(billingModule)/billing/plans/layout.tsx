import React, { ReactNode } from "react";
import SuperAdminBillingPlansTabs from "./plans/ui/BillingPlansTabs";
import PageName from "@/components/ui/commons/PageName";

const SettingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName name={"Billing"}
       breadcrumbs={[
        {
          name: "Dashboard",
          href: "/admin",
        },
        {
          name: "Billing",
          href: "/admin/billing/plans/plans",
        },
      ]}
      />
      <SuperAdminBillingPlansTabs />
      <div className="">{children}</div>
    </div>
  );
};

export default SettingRoot;
