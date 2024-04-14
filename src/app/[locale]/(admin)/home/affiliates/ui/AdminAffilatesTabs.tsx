"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import { LinkIcon,    UsersIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const AdminAffilatesTabs = () => {
  const t = useTranslations("AdminLayout.pages.affiliates");

  const tabs = [
    {
      path: "/home/affiliates/link",
      label:  t("link"),
      icon: LinkIcon,
    },
    {
      path: "/home/affiliates/all",
      label:  t("refferals"),
      icon: UsersIcon,
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default AdminAffilatesTabs;
