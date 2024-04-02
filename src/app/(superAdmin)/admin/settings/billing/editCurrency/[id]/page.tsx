import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { getCurrencyDetails } from "@/actions/superAdmin/superAdminBillingModule/get-currency-details";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import UpsertCurrency from "../../ui/UpsertCurrency";

const SuperAdminEditCurrency = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const values = await getCurrencyDetails(Number(params.id));

  return (
    <div>
      <PageName name={"Edit Currency"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href="/admin/settings/billing">
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Back
          </button>
        </Link>
      </div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <UpsertCurrency planId={Number(params.id)} values={values} />
      </Suspense>
    </div>
  );
};

export default SuperAdminEditCurrency;
