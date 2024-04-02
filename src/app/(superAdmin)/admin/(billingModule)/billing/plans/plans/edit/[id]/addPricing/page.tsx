import React, { Suspense } from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertPlanPricing from "../../../ui/UpsertPlanPricing";
import { getPlanDetails } from "@/actions/superAdmin/superAdminBillingModule/get-plan-details";

export const metadata: Metadata = {
  title: "Plan New Pricing",
};

const PlanNewPricing = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const plan = await getPlanDetails(Number(params.id));

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={4} />}>
        <PageName name={"New Plan Price"} isSubPage={true} />
        <div className="flex items-center py-2 lg:px-7 ">
          <Link href={`/admin/billing/plans/plans/edit/${plan?.id}`}>
            <button className="btn-icon ">
              <ArrowLeftCircleIcon className="w-6 h-6" /> Back
            </button>
          </Link>
        </div>
        <UpsertPlanPricing
          values={{
            planId: plan?.id.toString(),
          }}
        />
      </Suspense>
    </div>
  );
};

export default PlanNewPricing;
