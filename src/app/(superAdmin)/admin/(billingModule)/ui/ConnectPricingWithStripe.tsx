"use client";
import { connectPricingWithStripe } from "@/actions/superAdmin/superAdminBillingModule/stripeActions/connect-pricing-with-stripe";
import { IPricing, PricingSettingType } from "@/interfaces/billingModule";
import { AdminCurrencies } from "@prisma/client";

const ConnectPricingWithStripe = ({
  pricing,
  currencies,
  path,
  settings,
  stripeProductId,
}: {
  pricing: IPricing;
  currencies: AdminCurrencies[];
  path: string;
  settings?: PricingSettingType[] | null;
  stripeProductId: string;
}) => {
  const checkConnected = (currencyCode: string) => {
    const setting = settings?.find(
      (setting) =>
        setting.settingName === "stripePriceId_" + currencyCode.toLowerCase()
    );
    return setting;
  };
  return (
    <div className="flex flex-col space-y-2">
      {currencies?.map((currency, index) => (
        <div key={`currency-${index}`} className="flex justify-between">
          <span className="text-primary">{currency.name}</span>
          {checkConnected(currency.code) ? (
            <span className="text-primary">Connected</span>
          ) : (
            <button
              className="btn-main"
              onClick={() =>
                connectPricingWithStripe({
                  pricingId: pricing.id,
                  currencyCode: currency.code.toLowerCase(),
                  pathToRevalidate: path,
                  stripeProductId,
                })
              }
            >
              Connect
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConnectPricingWithStripe;
