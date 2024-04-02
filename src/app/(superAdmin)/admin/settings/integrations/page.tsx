import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import NewForm from "@/components/core/NewForm";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Integrations Settings",
};

const SuperAdminSettingsModuleIntegrationsPage = async () => {
  const { data: getSettings } = await getAllSuperAdminSettings();
  const formInfo = {
    name: "ImageKit",
    description: "CDN Image (imagekit.io)",
  };

  const fields = [
    {
      name: "IMAGEKIT_PUBLIC_KEY",
      label: "IMAGEKIT_PUBLIC_KEY",
      type: "text",
      required: true,
    },
    {
      name: "IMAGEKIT_PRIVATE_KEY",
      label: "IMAGEKIT_PRIVATE_KEY",
      type: "text",
      required: true,
    },
    {
      name: "IMAGEKIT_URL_ENDPOINT",
      label: "IMAGEKIT_URL_ENDPOINT",
      type: "text",
      required: true,
    },
  ];

  const stripeFormInfo = {
    name: "Stripe Integration",
    description: "Stripe Integration Configuration",
  };

  const stripeFieldsStripe = [
    {
      name: "STRIPE_CLIENT_ENABLED",
      label: "STRIPE_CLIENT_ENABLED",
      required: false,
      type: "toggle",
    },
    {
      name: "STRIPE_MODE",
      label: "STRIPE_MODE",
      type: "select",
      required: false,
      options: [
        {
          optionName: "SANDBOX",
          optionValue: "test",
        },
        {
          optionName: "PRODUCTION",
          optionValue: "prod",
        },
      ],
    },

    {
      name: "STRIPE_CLIENT_PK_SANDBOX",
      label: "STRIPE_CLIENT_PK_SANDBOX",
      required: false,
      type: "text",
    },
    {
      name: "STRIPE_CLIENT_PK_PRODUCTION",
      label: "STRIPE_CLIENT_PK_PRODUCTION",
      required: false,
      type: "text",
    },
    {
      name: "STRIPE_CLIENT_SECRET_SANDBOX",
      label: "STRIPE_CLIENT_SECRET_SANDBOX",
      required: false,
      type: "text",
    },
    {
      name: "STRIPE_CLIENT_SECRET_PRODUCTION",
      label: "STRIPE_CLIENT_SECRET_PRODUCTION",
      required: false,
      type: "text",
    },
    {
      name: "STRIPE_ENDPOINT_SECRET",
      label: "STRIPE_ENDPOINT_SECRET",
      required: false,
      type: "text",
    },
  ];

  const novuFormInfo = {
    name: "Novu Integration",
    description: "Notification System by Novu.co",
  };

  const novuFields = [
    {
      name: "NOVU_SUPER_ADMIN_TEMPLATE_ID",
      label: "Template ID for Super Admins notifications",
      type: "text",
      required: true,
    },
    {
      name: "NOVU_ADMIN_TEMPLATE_ID",
      label: "Template ID for Admins notifications",
      type: "text",
      required: true,
    },
  ];

  const telegramFormInfo = {
    name: "Telegram Integration",
    description: "Notification System by Telegram",
  };

  const telegramFields = [
    {
      name: "TELEGRAM_GROUP_ID",
      label: "Telegram  Group / Channel ID",
      type: "text",
      required: true,
    },
    {
      name: "TELEGRAM_GROUP_TOKEN",
      label: "Telegram Group / Channel token",
      type: "text",
      required: true,
    },
  ];

  return (
    <>
      <NewForm
        values={getSettings}
        info={formInfo}
        fields={fields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
      <NewForm
        values={getSettings}
        info={stripeFormInfo}
        fields={stripeFieldsStripe}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
      <NewForm
        values={getSettings}
        info={novuFormInfo}
        fields={novuFields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
      <NewForm
        values={getSettings}
        info={telegramFormInfo}
        fields={telegramFields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
    </>
  );
};

export default SuperAdminSettingsModuleIntegrationsPage;
