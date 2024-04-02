import { Metadata } from "next";
import NewForm from "@/components/core/NewForm";
import { getAllSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/get-superadmin-settings";
import { saveSuperAdminSettings } from "@/actions/superAdmin/superAdminSettingsModule/save-superadmin-settings";
import CurrenciesSettingsSection from "./ui/CurrenciesSettingsSection";
import PaymentMethodsSection from "./ui/PaymentMethodsSection";

export const metadata: Metadata = {
  title: "Billing Settings",
};

const SuperAdminSettingsModuleBillingPage = async () => {
  const { data: getSettings } = await getAllSuperAdminSettings();

  const formInfo = {
    name: "Billing Legal Data  ",
    description: "Billing Legal Data Configuration",
  };

  const fields = [
    {
      name: "BUSINESS_NAME",
      label: "Business Name",
      type: "text",
      required: false,
    },
    {
      name: "BUSINESS_ADDRESS",
      label: "Business Address",
      type: "text",
      required: false,
    },
  ];

  const formAffiliateSystemInfo = {
    name: "Affiliate System  ",
    description: "Configuration of the Affiliate System",
  };

  const fieldsAffiliateSystem = [
    {
      name: "AFFILIATE_SYSTEM_DEFAULT_COMMISSION",
      label: "% Default Commission",
      type: "number",
      required: false,
    },
  ];
  return (
    <>
      <CurrenciesSettingsSection />
      <br />
      <hr />
      <PaymentMethodsSection />
      <br />
      <hr />
      <NewForm
        values={getSettings}
        info={formInfo}
        fields={fields}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
      <NewForm
        values={getSettings}
        info={formAffiliateSystemInfo}
        fields={fieldsAffiliateSystem}
        onSubmit={saveSuperAdminSettings}
        isSettingForm={true}
      />{" "}
    </>
  );
};

export default SuperAdminSettingsModuleBillingPage;
