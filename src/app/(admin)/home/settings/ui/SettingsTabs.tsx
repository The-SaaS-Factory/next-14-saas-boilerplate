"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/core/Tabs";
import { UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useOrganization, useUser } from "@clerk/nextjs";

const SettingsTabs = () => {
  const { organization, isLoaded } = useOrganization();
  const { user } = useUser();

  const [tabs, setTabs] = useState([
    {
      path: "/home/settings/profile",
      label: "Perfil",
      icon: UsersIcon,
    },
  ]);

  useEffect(() => {
     
    if (organization?.id && isLoaded) {
      setTabs([
        {
          path: "/home/settings/profile",
          label: "Perfil",
          icon: UsersIcon,
        },
        {
          path: "/home/settings/billing/planActive",
          label: "Planes de fidelidad",
          icon: UserGroupIcon,
        },
      ]);
    } else {
      setTabs([
        {
          path: "/home/settings/profile",
          label: "Perfil",
          icon: UsersIcon,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization, user]);

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default SettingsTabs;
