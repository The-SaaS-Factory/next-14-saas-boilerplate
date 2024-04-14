"use client";
import Tabs from "@/components/core/Tabs";
import { CpuChipIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import React from "react";

const SuperAdminBillingPlansTabs = () => {
  const tabs = [
    {
      path: "/admin/billing/plans/plans",
      label: "Plans",
      icon: ShoppingBagIcon,
    },
    {
      path: "/admin/billing/plans/capabilities",
      label: "Capabilities",
      icon: CpuChipIcon,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SuperAdminBillingPlansTabs;
