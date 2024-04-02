"use client";
import React from "react";
import Tabs from "@/components/core/Tabs";
import { UsersIcon } from "@heroicons/react/24/outline";

const SettingsTabs = () => {
  const tabs = [
    {
      path: "/home/settings/profile",
      label: "Perfil",
      icon: UsersIcon,
    },
  ];

  // useEffect(() => {

  //   if (!organization?.id && isLoaded) {
  //     setTabs([
  //       {
  //         path: "/home/settings/profile",
  //         label: "Perfil",
  //         icon: UsersIcon,
  //       },
  //       {
  //         path: "/home/settings/billing/planActive",
  //         label: "Planes de fidelidad",
  //         icon: UserGroupIcon,
  //       },
  //     ]);
  //   } else {
  //     setTabs([
  //       {
  //         path: "/home/settings/profile",
  //         label: "Perfil",
  //         icon: UsersIcon,
  //       },
  //     ]);
  //   }
  // }, [organization, user]);

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SettingsTabs;
