import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import UpsertCapabilitie from "../../ui/UpsertCapabilitie";
import { getCapabilitieDetails } from "@/actions/superAdmin/superAdminBillingModule/get-capabilitie-details";

export const metadata: Metadata = {
  title: "Edit Capabilitie",
};

const SuperAdminBillingModuleEditPlanPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const values = await getCapabilitieDetails(Number(params.id));

  return (
    <div>
      <PageName name={"Edit Capabilitie"} isSubPage={true} />
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <UpsertCapabilitie capabilitieId={Number(params.id)} values={values} />
      </Suspense>
    </div>
  );
};

export default SuperAdminBillingModuleEditPlanPage;
