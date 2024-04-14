import React, { ReactNode } from "react";
import PageName from "@/components/ui/commons/PageName";
import AdminAffilatesTabs from "./ui/AdminAffilatesTabs";
import { useTranslations } from "next-intl";

const SettingRoot = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("AdminLayout.pages.affiliates");

  return (
    <div>
      <PageName
        name={t("affiliatePanel")}
        breadcrumbs={[
          {
            name:  t("dashboard"),
            href: "/home",
          },
          {
            name: t("refferals"),
            href: "/home/affiliates",
          },
        ]}
      />
      <AdminAffilatesTabs />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;
