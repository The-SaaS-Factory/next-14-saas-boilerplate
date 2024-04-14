import React, { ReactNode } from "react";
import SettingsTabs from "./ui/SettingsTabs";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
export const metadata: Metadata = {
  title: "Ajustes",
};

const SettingRoot = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("AdminLayout.pages.settings");
  return (
    <div>
      <PageName
        name={t("settings")}
        breadcrumbs={[
          {
            name: t("dashboard"),
            href: "/home",
          },
          {
            name: t("settings"),
            href: "/home/settings/profile",
          },
        ]}
      />
      <SettingsTabs />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;
