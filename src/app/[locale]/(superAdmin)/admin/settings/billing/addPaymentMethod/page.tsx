import React from "react";
import { Metadata } from "next";
import PageName from "@/components/ui/commons/PageName";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import UpsertPaymentMethod from "../ui/UpsertPaymentMethod";

export const metadata: Metadata = {
  title: "New Currency",
};

const SuperAdmiNAddNewCurrency = () => {
  return (
    <div>
      <PageName name={"New Currency"} isSubPage={true} />
      <div className="flex items-center py-2 lg:px-7 ">
        <Link href="/admin/settings/billing">
          <button className="btn-icon ">
            <ArrowLeftCircleIcon className="w-6 h-6" /> Back
          </button>
        </Link>
      </div>
      <UpsertPaymentMethod />
    </div>
  );
};

export default SuperAdmiNAddNewCurrency;
