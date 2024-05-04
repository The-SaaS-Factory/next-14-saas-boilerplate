"use client";
import Link from "next/link";
import useMembership from "@/app/hooks/useMembership";
import { useTranslations } from "next-intl";
const MembershipActivateBanner = () => {
  const { membershipPlanName, membershipEndDate } = useMembership();
  const t = useTranslations("AdminLayout.pages.plans");
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      {membershipPlanName && (
        <>
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <p className="title">
              <span>
              {t("congratulation")} 
                <strong className="font-semibold pr-1">
                  {" "}
                  {membershipPlanName}
                </strong>
                {t("plan")} 
                <svg
                  viewBox="0 0 2 2"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                  aria-hidden="true"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                {t("activeUntil")}  {membershipEndDate}
              </span>
            </p>
            <Link
              href="/home/settings/billing/buyPlan"
              className="text-primary"
            >
              <button className="btn-main">{t("change")} </button>
            </Link>
          </div>
          <div className="flex flex-1 justify-end"></div>
        </>
      )}
    </div>
  );
};

export default MembershipActivateBanner;
