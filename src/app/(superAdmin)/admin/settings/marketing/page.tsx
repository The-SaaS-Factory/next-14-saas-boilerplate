import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import NewForm from "@/components/core/NewForm";
import { Plan } from "@prisma/client";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Marketing Settings",
};

const SuperAdminSettingsModuleMarketingPage = async () => {
  const { data: getSettings } = await getAllSuperAdminSettings();
  const { data: plans } = await getAllPlans();

  const formInfo = {
    name: "Free Trial",
    description: "Free trial configuration",
  };
  const fields = [
    {
      name: "MARKETING_FREE_TRIAL",
      label: "Enable Free Trial",
      type: "toggle",
      required: true,
    },
    {
      name: "MARKETING_FREE_DAYS",
      label: "Days Free",
      type: "number",
      parseToString: true,
      required: true,
    },
    {
      name: "MARKETING_FREE_TRIAL_PLAN",
      label: "Plan for Free Trial",
      type: "select",
      required: true,
      forceInteger: true,
      options: plans?.map((plan: Plan) => {
        return {
          optionName: plan.name,
          optionValue: plan.id,
        };
      }),
    },
  ];

  const formInfoLoops = {
    name: "Loops Email Marketing",
    description: "Loops Email Marketing (Loops.so)",
  };

  const fieldsLoops = [
    {
      name: "LOOPS_ENABLED",
      label: "Loops Enabled",
      type: "toggle",
      required: true,
    },
    {
      name: "LOOPS_API_KEY",
      label: "Loops API Key",
      type: "text",
      required: true,
    },
    {
      name: "LOOPS_STORE_CONTACTS_ENABLED",
      label: "Save contacts in Loops to register user",
      type: "toggle",
      required: true,
    },
    {
      name: "MARKETING_WELCOME_EMAIL_FOR_USERS_ENABLED",
      label: "Welcome Email for users",
      type: "toggle",
      required: true,
    },
    {
      name: "MARKETING_WELCOME_EMAIL_USER_TRANSACTIONALID",
      label: "Welcome Email for users Transactional ID",
      type: "text",
      required: false,
      note: `You can use the variable "name" in the transactional body (In Loop.so) to show the user's  name.`,
    },
    {
      name: "LOOPS_DELIVERABLE_COMPLETED_TRANSACTIONAL_ID",
      label: "Deliverable completed transactional Id",
      type: "text",
      required: false,
    },
    {
      name: "LOOPS_INVOICE_PAID_TRANSACTIONAL_ID",
      label: "Invoice payment transactional Id",
      type: "text",
      required: false,
    },
    {
      name: "LOOPS_INVOICE_NOTIFIED_TRANSACTIONAL_ID",
      label: "Invoice Due Notification transactional Id",
      type: "text",
      required: false,
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
        info={formInfoLoops}
        fields={fieldsLoops}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
    </>
  );
};

export default SuperAdminSettingsModuleMarketingPage;
