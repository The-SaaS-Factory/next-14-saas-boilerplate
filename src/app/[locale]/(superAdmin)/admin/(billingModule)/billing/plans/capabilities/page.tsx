import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import CapabilitiesList from "./ui/CapabilitiesList";

export const metadata: Metadata = {
  title: "Capabilities",
};

const SuperAdminBillingPlanCapabilitiePage = () => {
  return (
    <div>
      <PageName
        name={"Capabilities"}
        isSubPage={true}
        btn1={{
          name: "Add Capabilitie  ",
          href: "capabilities/add",
        }}
      />
      <CapabilitiesList />
    </div>
  );
};

export default SuperAdminBillingPlanCapabilitiePage;
