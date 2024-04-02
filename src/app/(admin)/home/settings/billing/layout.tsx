import { ReactNode } from "react";
import MembershipActivateBanner from "./ui/MembershipActivateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plans",
};

const AdminSettingsModuleGeneralPage = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="mt-1">
      <div>
        <div className="bg-white -mt-3 ">
          <div>
            <MembershipActivateBanner />
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleGeneralPage;
