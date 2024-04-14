"use client";
import useDarkTheme from "@/app/hooks/useDarkTheme";
import { OrganizationProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const AdminSettingsModuleOrganizationPage = () => {
  const { isDarkTheme } = useDarkTheme();
  return (
    <div>
      <div className="mt-1">
        <div className="  w-full">
          <div className="flex flex-col items-center justify-center">
            <OrganizationProfile
              appearance={{
                baseTheme: isDarkTheme ? dark : undefined,
                elements: { card: "shadow-none" },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleOrganizationPage;
