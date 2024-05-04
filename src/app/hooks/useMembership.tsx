"use client";
import { traslateData } from "@/utils/facades/frontendFacades/parseValuesFacade";
//import { useOrganization, useUser } from "@clerk/nextjs";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const useMembership = () => {
  const [membershipPlanName, setMembershipPlanName] = useState<string | null>(
    null
  );
  const [membershipEndDate, setMembershipEndDate] = useState<string | null>(
    null
  );
  const { organization } = useOrganization();
  const { user } = useUser();
  const locale = useLocale();

  useEffect(() => {
    if (organization && organization.publicMetadata) {
      if (organization.publicMetadata.membershipPlan) {
        setMembershipPlanName(
          traslateData(
            organization.publicMetadata.membershipPlan as string,
            locale
          )
        );
      }

      if (organization.publicMetadata.membershipEndDate) {
        setMembershipEndDate(
          new Date(
            organization.publicMetadata.membershipEndDate as string
          ).toDateString()
        );
      }
    }
  }, [organization]);

  useEffect(() => {
    if (!organization && user && user.publicMetadata) {
      if (user.publicMetadata.membershipPlan) {
        setMembershipPlanName(
          traslateData(user.publicMetadata.membershipPlan as string, locale)
        );
      }

      if (user.publicMetadata.membershipEndDate) {
        setMembershipEndDate(
          new Date(
            user.publicMetadata.membershipEndDate as string
          ).toDateString()
        );
      }
    }
  }, [user]);

  return {
    membershipPlanName,
    membershipEndDate,
  };
};

export default useMembership;
