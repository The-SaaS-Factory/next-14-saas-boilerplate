import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import UpsertMembership from "../ui/UpsertMembership";

export const metadata: Metadata = {
  title: "Add membership",
};

const AddMembership = async () => {
  const plans = await getAllPlans();
  const currencies = await getAllCurrencies();
  return (
    <div>
      <PageName
        name={"Add Membership"}
        breadcrumbs={[
          {
            name: "Subscriptions",
            href: "/admin/billing/subscriptions",
          },
          {
            name: "Add Membership",
            href: "",
          },
        ]}
      />
      <Suspense
        fallback={
          <div>
            <PageLoader />
          </div>
        }
      >
        <UpsertMembership
          values={[]}
          plans={plans.data}
          currencies={currencies}
        />
      </Suspense>
    </div>
  );
};

export default AddMembership;
