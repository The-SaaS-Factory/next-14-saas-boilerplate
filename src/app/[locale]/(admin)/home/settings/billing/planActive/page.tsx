"use client";
import React, { useEffect } from "react";
import { getPlanByName } from "@/actions/superAdmin/superAdminBillingModule/get-plan-by-name";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import PlanActive from "./ui/PlanActive";
import PaymentStatusAlert from "../../ui/PaymentStatusAlert";
import { getUserCapabilities } from "@/actions/admin/userModule/get-user-capabilities";

const AdminPlanActive = ({
  searchParams,
}: {
  searchParams?: {
    paymentStatus?: string;
  };
}) => {
  const router = useRouter();
  const [planCapabilities, setPlanCapabilities] = React.useState<any[]>([]);
  const [capacitiesUsed, setCapacitiesUsed] = React.useState<any[]>([]);

  //Hooks
  const { organization } = useOrganization();
  const { user } = useUser();

  //Queries
  const getPlan = async (name: string) => {
    return await getPlanByName(name);
  };

  useEffect(() => {
    if (organization) {
      console.log(organization.publicMetadata?.membershipPlan);
      
      if (!organization.publicMetadata?.membershipPlan) {
        //return to /buypland
        router.push("buyPlan", { scroll: false });
      }

      getPlan(organization.publicMetadata?.membershipPlan as string).then(
        (data) => {
          if (!data) return;
          setPlanCapabilities(data.PlanCapabilities);
        }
      );

      getUserCapabilities().then((data) => {
        if (!data) return;

        setCapacitiesUsed(data);
      });
    }
  }, [organization, router]);

  useEffect(() => {
    if (!organization && user) {
      if (!user.publicMetadata?.membershipPlan) {
        //return to /buyplan
        router.push("buyPlan", { scroll: false });
      }

      getPlan(user.publicMetadata?.membershipPlan as string).then((data) => {
        if (!data) return;
        setPlanCapabilities(data.PlanCapabilities);
      });

      getUserCapabilities().then((data) => {
        if (!data) return;

        setCapacitiesUsed(data);
      });
    }
  }, [user, router]);

  return (
    <div>
      <PlanActive
        planCapabilities={planCapabilities}
        usedCapabilities={capacitiesUsed}
      />
      <PaymentStatusAlert status={searchParams?.paymentStatus} />
    </div>
  );
};

export default AdminPlanActive;
