import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getPlanDetails } from "@/actions/superAdmin/superAdminBillingModule/get-plan-details";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertPlan from "../../ui/UpsertPlan";
import UpsertPlanCapabilities from "../../ui/UpsertPlanCapabilities";
import { getAllCapabilities } from "@/actions/superAdmin/superAdminBillingModule/get-all-capabilities";
import PlanPricingSection from "../../ui/PlanPricingSection";

export const metadata: Metadata = {
  title: "Edit Plan",
};

const SuperAdminBillingModuleEditPlanPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const plan = await getPlanDetails(Number(params.id));
  const capabilities = await getAllCapabilities();

  return (
    <div>
      <PageName name={"Edit Plan"} isSubPage={true} />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <UpsertPlan planId={Number(params.id)} values={plan} />
        <UpsertPlanCapabilities planOnEdit={plan} capabilities={capabilities} />
        {plan && (
          <div className="mb-20">
            <PlanPricingSection plan={plan} pricings={plan?.pricing ?? []} />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SuperAdminBillingModuleEditPlanPage;
