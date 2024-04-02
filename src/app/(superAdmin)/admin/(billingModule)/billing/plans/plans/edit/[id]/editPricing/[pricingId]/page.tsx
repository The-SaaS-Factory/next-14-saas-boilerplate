import React, { Suspense } from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertPlanPricing from "../../../../ui/UpsertPlanPricing";
import { getPricingDetails } from "@/actions/superAdmin/superAdminBillingModule/get-pricing-details";
import { getPlanDetails } from "@/actions/superAdmin/superAdminBillingModule/get-plan-details";

export const metadata: Metadata = {
  title: "Edit plan pricing",
};

const PlanEditPricing = async ({
  params,
}: {
  params: {
    id: string;
    pricingId: string;
  };
}) => {
  const plan = await getPlanDetails(Number(params.id));
  const pricing = await getPricingDetails(Number(params.pricingId));
  return (
    <div>
      <PageName name={"Edit Plan Price"} isSubPage={true} />
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        <div className="flex items-center py-2 lg:px-7 ">
          <Link href={`/admin/billing/plans/plans/edit/${plan?.id}`}>
            <button className="btn-icon ">
              <ArrowLeftCircleIcon className="w-6 h-6" /> Back
            </button>
          </Link>
        </div>
        {plan && pricing && (
          <UpsertPlanPricing
            modelId={pricing.id}
            values={{
              ...pricing,
              planId: plan?.id.toString(),
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

export default PlanEditPricing;
