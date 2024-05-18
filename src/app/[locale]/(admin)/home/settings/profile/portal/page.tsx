import React from "react";
import { Metadata } from "next";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { constants } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "User Payment Portal",
};

const UserPortal = async () => {
  const t = await getTranslations("AdminLayout.pages.memberships");

  return (
    <div>
      <div className="flex">
        <div className="flex-1 p-3 bg-gradient-to-br from-slate-50 via-slate-100 to-gray-50">
          <div className="text-xl  flex space-x-3 justify-center font-bold text-center">
            <Link
              className="btn-main flex items-center space-x-3"
              href={`${constants.portalStripe} `}
            >
              {t("stripePortal")}
              <BuildingLibraryIcon className="h-8 w-8 inline-block" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;