import React, { Suspense } from "react";
import { Metadata } from "next";
//import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { parsePriceInLocalCurrency } from "@/utils/facades/frontendFacades/parseValuesFacade";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Wallet",
};

const AdminWalletPage = async ({
  searchParams,
}: {
  searchParams?: {
    currency?: string;
  };
}) => {
  const user = await getUserDB();
  const currencySelected = searchParams?.currency;
  const t = await getTranslations("AdminLayout.pages.wallet");

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={5} />}>
        <div className="bg-main rounded-2xl p-3 border-2 ">
          <h2 className="text-subtitle">
            {t("yourWallet")}  
          </h2>
          <div className="flex flex-col divide-y-2">
            {user?.Amounts?.map((amount: any) => {
              return (
                <div
                  className={`flex  flex-col space-y-3 mt-3 px-3   ${
                    currencySelected === amount.Currency?.code.toLowerCase() &&
                    "bg-main-selected rounded-2xl"
                  } `}
                  key={amount.id}
                >
                  <Link
                    href={`/home/wallet?currency=${amount.Currency.code.toLowerCase()}`}
                  >
                    <div className="flex justify-between pb-7 pt-3 ">
                      <h3 className="text-subtitle   ">
                        {amount.Currency.name}
                      </h3>
                      <span className="text-primary pb-3">  {t("seeMovements")} </span>
                    </div>
                  </Link>
                  <div className="flex w-full pb-3 justify-between   items-center ">
                    <h2 className="text-title ">
                      {parsePriceInLocalCurrency(
                        amount.amount,
                        amount.Currency.code
                      )}
                    </h2>
                    <div>
                      {/* <CurrencyActionsButtons
                        currencyCode={amount.Currency.code}
                        currencyId={amount.Currency.id}
                        paymentMethods={paymentMethods} 
                      />*/}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default AdminWalletPage;
