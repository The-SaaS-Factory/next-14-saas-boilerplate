import PageName from "@/components/ui/commons/PageName";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAffiliatesForUser } from "@/actions/global/affiliateSystem/get-affiliates-for-user";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "My affiliates",
};

const CreateNewAffiliate = async () => {
  const userAffiliates = await getAffiliatesForUser();
  const t = await getTranslations("AdminLayout.pages.affiliates");

  return (
    <div>
      <PageName name={t("refferals")} isSubPage={true} />
      <Suspense fallback={<PageLoader />}>
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="flex order-2 lg:order-1 flex-1 flex-col">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-main">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {t("name")}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {t("date")}
                        </th>

                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Ver</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userAffiliates?.map((affiliate: any) => (
                        <tr key={affiliate.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-primary">
                                {affiliate.refer.name?.slice(0, 15)}...
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTimestampToDateString(
                              affiliate.refer.createdAt
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 order-1 lg:order-2 p-3">
            <h2 className="text-subtitle">
              {t("totalAffiliates")} {" "}
              {userAffiliates?.length}
            </h2>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CreateNewAffiliate;
