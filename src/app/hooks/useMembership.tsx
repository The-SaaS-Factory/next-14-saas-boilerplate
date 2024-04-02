"use client";
//import { useOrganization, useUser } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useMembership = () => {
 
  const [membershipPlanName, setMembershipPlanName] = useState<string | null>(
    null
  );
  const [membershipEndDate, setMembershipEndDate] = useState<string | null>(
    null
  );
  //const { organization } = useOrganization();
  const { user } = useUser();

  // useEffect(() => {
  //   if (organization && organization.publicMetadata) {
  //     if (organization.publicMetadata.membershipPlan) {
  //       setMembershipPlanName(
  //         organization.publicMetadata.membershipPlan as string
  //       );
  //     }

  //     if (organization.publicMetadata.membershipEndDate) {
  //       setMembershipEndDate(
  //         new Date(
  //           organization.publicMetadata.membershipEndDate as string
  //         ).toDateString()
  //       );
  //     }
  //   }
  // }, [organization]);

  useEffect(() => {
    if (user && user.publicMetadata) {
      if (user.publicMetadata.membershipPlan) {
        setMembershipPlanName(user.publicMetadata.membershipPlan as string);
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
