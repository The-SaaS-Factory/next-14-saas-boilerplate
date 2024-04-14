import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertCoupon from "../../ui/UpsertCoupon";
import { getCouponDetails } from "@/actions/superAdmin/superAdminBillingModule/coupons/get-coupon-details";

export const metadata: Metadata = {
  title: "Edit Coupon",
};

const SuperAdminBillingModuleEditPlanPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const values = await getCouponDetails(Number(params.id));

  return (
    <div>
      <PageName
        name={"Edit Capabilitie"}
        isSubPage={true}
        breadcrumbs={[
          {
            name: "Coupons",
            href: "/admin/billing/coupons",
          },
          {
            name: "New Coupon",
            href: "",
          },
        ]}
      />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <UpsertCoupon modelId={Number(params.id)} values={values} />
      </Suspense>
    </div>
  );
};

export default SuperAdminBillingModuleEditPlanPage;
