import { getPaymentSettings } from "@/actions/superAdmin/superAdminBillingModule/get-payment-settings";
import React, { Suspense } from "react";
import PlansComponent from "./ui/BuyPlan";
import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import { Metadata } from "next";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import PageLoader from "@/components/ui/loaders/PageLoader";
import PaymentStatusAlert from "../../ui/PaymentStatusAlert";
import { getPaymentMethods } from "@/actions/superAdmin/superAdminBillingModule/get-all-payment-methods";

export const metadata: Metadata = {
  title: "Buy Plan",
};

const BuyPlanPage = async ({
  searchParams,
}: {
  searchParams?: {
    paymentStatus?: string;
  };
}) => {
  const { data: payments } = await getPaymentSettings();
  const { data: plans } = await getAllPlans();
  const currencies = await getAllCurrencies();
  const paymentMethods = await getPaymentMethods();

  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <PlansComponent
          payments={payments}
          plans={plans}
          paymentMethods={paymentMethods}
          currencies={currencies}
        />
        <PaymentStatusAlert status={searchParams?.paymentStatus} />
      </Suspense>
    </div>
  );
};

export default BuyPlanPage;
