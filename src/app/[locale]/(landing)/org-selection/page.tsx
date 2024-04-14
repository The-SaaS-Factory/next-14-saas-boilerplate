import { CreateOrganization  } from "@clerk/nextjs";
import React from "react";

const OrganizationSelector = () => {
  return (
    <main>
      <div
        className="bg-main-background"
      >
        <CreateOrganization afterCreateOrganizationUrl={'/home'} />
      </div>
    </main>
  );
};

export default OrganizationSelector;
