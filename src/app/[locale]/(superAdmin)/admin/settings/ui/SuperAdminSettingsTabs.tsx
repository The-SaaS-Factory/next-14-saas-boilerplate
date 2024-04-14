"use client";
import Tabs from "@/components/core/Tabs";
import { CodeBracketIcon, CreditCardIcon, FaceSmileIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

const SuperAdminSettingsTabs = () => {
  const tabs = [
    {
      path: "/admin/settings/general",
      label: "General",
      icon: UserGroupIcon,
    },
    {
      path: "/admin/settings/integrations",
      label: "Integrations",
      icon: CodeBracketIcon,
    },
    {
      path: "/admin/settings/marketing",
      label: "Marketing",
      icon: FaceSmileIcon,
    },
    {
      path: "/admin/settings/billing",
      label: "Billing",
      icon: CreditCardIcon,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SuperAdminSettingsTabs;
