"use client";
import useDarkTheme from "@/app/hooks/useDarkTheme";
import {
  OrganizationProfile,
  UserProfile,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const AdminSettingsModuleProfilePage = () => {
  const { isDarkTheme } = useDarkTheme();
  const { organization } = useOrganization();
  const { user } = useUser();
  return (
    <div>
      <div className="mt-1">
        {(user && !organization ) && (
          <UserProfile
            appearance={{
              baseTheme: isDarkTheme ? dark : undefined,
              elements: { card: "shadow-none" },
            }}
          />
        )}
        {organization && (
          <OrganizationProfile
            appearance={{
              baseTheme: isDarkTheme ? dark : undefined,
              elements: { card: "shadow-none" },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSettingsModuleProfilePage;
