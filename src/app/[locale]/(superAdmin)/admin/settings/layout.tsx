import React, { ReactNode } from "react";
import SuperAdminSettingsTabs from "./ui/SuperAdminSettingsTabs";
import PageName from "@/components/ui/commons/PageName";

const SettingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PageName name="Settings" />
      <SuperAdminSettingsTabs />
      <div>{children}</div>
    </div>
  );
};

export default SettingRoot;
