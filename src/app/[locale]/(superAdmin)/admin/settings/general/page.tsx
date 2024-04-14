import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import NewForm from "@/components/core/NewForm";
import React from "react";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Settings"
};
const SuperAdminSettingsModuleGeneralPage = async () => {

  const { data: getSettings } = await getAllSuperAdminSettings();
  const formInfo = {
    name: "General Settings",
    description: "General Settings Configuration",
  };

  const fields = [
    {
      name: "PLATFORM_NAME",
      label: "Platform Name",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_RESUME",
      label: "Platform Resume",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_ADDRESS",
      label: "Platform Address",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_EMAIL",
      label: "Platform Email",
      type: "text",
      required: false,
    },
    {
      name: "SUPPORT_PHONE_WA",
      label: "WA PHONE SUPPORT",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_FAVICON",
      label: "Favicon URL",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_LOGO",
      label: "Logo URL",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_DEMO_URL",
      label: "Demo URL",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_DOC_URL",
      label: "Documentation URL",
      type: "text",
      required: false,
    },
    {
      name: "PLATFORM_FRONTEND_URL",
      label: "Frontend URL",
      type: "text",
      required: false,
    },
  ];

 
  return (
    <div>
      <NewForm
        values={getSettings}
        info={formInfo}
        fields={fields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
    </div>
  );
};

export default SuperAdminSettingsModuleGeneralPage;
