"use client";
import { connectCouponWithStripe } from "@/actions/superAdmin/superAdminBillingModule/stripeActions/connect-coupon-with-stripe";
import { ICoupon } from "@/interfaces/billingModule";
import { AdminCurrencies, CouponSettings } from "@prisma/client";

const ConnectCouponWithStripe = ({
  coupon,
  currencies,
  path,
  settings,
}: {
  coupon: ICoupon;
  currencies: AdminCurrencies[];
  path: string;
  settings?: CouponSettings[] | null;
}) => {
  const checkConnected = (currencyCode: string) => {
    
    const setting = settings?.find(
      (setting) =>
        setting.name === "stripeCouponId_" + currencyCode.toLowerCase()
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
                connectCouponWithStripe({
                  couponId: coupon.id,
                  currencyCode: currency.code.toLowerCase(),
                  pathToRevalidate: path,
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

export default ConnectCouponWithStripe;
