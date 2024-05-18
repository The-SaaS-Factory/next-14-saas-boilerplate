"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@/components/core/Tabs";
import { UserGroupIcon, UsersIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

const SettingsTabs = () => {
  const { organization, isLoaded } = useOrganization();
  const { user } = useUser();
  const t = useTranslations("AdminLayout.pages.settings");

  const [tabs, setTabs] = useState([
    {
      path: "/home/settings/profile",
      label: t("profile"),
      icon: UsersIcon,
    },
  ]);

  useEffect(() => {
    if (organization?.id && isLoaded) {
      setTabs([
        {
          path: "/home/settings/profile",
          label: t("profile"),
          icon: UsersIcon,
        },
        {
          path: "/home/settings/billing/planActive",
          label: t("plansFidelity"),
          icon: UserGroupIcon,
        },
        {
          path: "/home/settings/profile/portal",
          label: t("portal"),
          icon: CreditCardIcon,
        },
      ]);
    } else {
      setTabs([
        {
          path: "/home/settings/profile",
          label: t("profile"),
          icon: UsersIcon,
        },
        {
          path: "/home/settings/profile/portal",
          label: t("portal"),
          icon: CreditCardIcon,
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
