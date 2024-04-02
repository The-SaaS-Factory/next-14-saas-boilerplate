import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getMembershipDetails } from "@/actions/superAdmin/superAdminBillingModule/get-membership-details";
import PageLoader from "@/components/ui/loaders/PageLoader";
import UpsertMembership from "../../ui/UpsertMembership";
import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";

export const metadata: Metadata = {
  title: "Edit membership",
};

const EditMembership = async ({
  params,
}: {
  params: {
    id: string;
    pricingId: string;
  };
}) => {
  const membership = await getMembershipDetails(Number(params.id));
  const plans = await getAllPlans();
  const currencies = await getAllCurrencies();
  return (
    <div>
      <PageName
        name={"Edit Membership"}
        breadcrumbs={[
          {
            name: "Subscriptions",
            href: "/admin/billing/subscriptions",
          },
          {
            name: "Edit Membership",
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
          membershipId={Number(params.id)}
          values={membership}
          plans={plans.data}
          currencies={currencies}
        />
      </Suspense>
    </div>
  );
};

export default EditMembership;
