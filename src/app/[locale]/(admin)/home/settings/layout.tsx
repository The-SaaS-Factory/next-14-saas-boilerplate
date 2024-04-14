import React, { ReactNode } from "react";
import SettingsTabs from "./ui/SettingsTabs";
import PageName from "@/components/ui/commons/PageName";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ajustes",
};

const SettingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName
        name={"Ajustes"}
        breadcrumbs={[
          {
            name: "Home",
            href: "/home",
          },
          {
            name: "Ajustes",
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
