import React from "react";
import { Metadata } from "next";
import UpgradeToAgencySection from "./ui/UpgradeToAgencySection";

export const metadata: Metadata = {
  title: "Upgrade",
};

const UpgradePage = () => {
  return (
    <div>
      <UpgradeToAgencySection />
    </div>
  );
};

export default UpgradePage;
