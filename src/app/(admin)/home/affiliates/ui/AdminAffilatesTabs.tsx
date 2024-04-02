"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import { LinkIcon,    UsersIcon } from "@heroicons/react/24/outline";

const AdminAffilatesTabs = () => {
  const tabs = [
    {
      path: "/home/affiliates/link",
      label: "Mi Link",
      icon: LinkIcon,
    },
    {
      path: "/home/affiliates/all",
      label: "Mis afiliados",
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
