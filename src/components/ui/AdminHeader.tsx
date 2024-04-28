"use client";
import { useSidebarState } from "@/states/ui/sidebarState";
import useDarkTheme from "@/app/hooks/useDarkTheme";
import useSuperAdmin from "@/app/hooks/useSuperAdmin";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import useMembership from "@/app/hooks/useMembership";
import UpgradeteButton from "../core/UpgradeteButton";
import { constants } from "@/lib/constants";
import { makeUserAsAdmin } from "@/actions/global/demoModule/make-user-as-admin";

const AdminHeader = ({
  notificationsCount,
}: {
  notificationsCount: number;
}) => {
  const { toggleSidebarMenu } = useSidebarState(({ toggleSidebarMenu }) => ({
    toggleSidebarMenu,
  }));

  const { isSuperAdmin } = useSuperAdmin();
  const { organization } = useOrganization();
  const { daktThemeSelector, isDarkTheme } = useDarkTheme();
  const { membershipPlanName } = useMembership();

  const handleAccessAsSuperAdminInDemoMode = async () => {
    if (constants.demoMode) await makeUserAsAdmin();
  };

  return (
    <div>
      {" "}
      <div className="sticky top-0 z-40 lg:mx-auto ">
        <div className="flex h-16 items-center gap-x-4 border-b text-primary border-gray-200 bg-main px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button
            type="button"
            className="-m-2.5 p-2.5   lg:hidden"
            onClick={() => toggleSidebarMenu()}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-main lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative p-4   flex-1">
              <div className=" hidden lg:flex space-x-3">
                <div>
                  <OrganizationSwitcher
                    appearance={{
                      baseTheme: isDarkTheme ? dark : undefined,
                    }}
                    hidePersonal={true}
                    afterSelectPersonalUrl={"/home"}
                    afterSelectOrganizationUrl={"/home"}
                    afterCreateOrganizationUrl={"/welcome"}
                    afterLeaveOrganizationUrl={"/home"}
                  />
                </div>
              </div>
              {membershipPlanName !== "Agency Plan" && !organization && (
                <div className="-ml-4 flex py-1 lg:hidden">
                  <UpgradeteButton />
                </div>
              )}
             
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {isSuperAdmin ? (
                <Link href="/admin" className="btn-main">
                  <span>Admin Panel</span>
                </Link>
              ) : (
                <div>
                  {constants.demoMode && (
                    <button
                      onClick={() => {
                        handleAccessAsSuperAdminInDemoMode();
                      }}
                      className="btn-main"
                    >
                      <span>Access as Super Admin</span>
                    </button>
                  )}
                </div>
              )}

              {daktThemeSelector}

              {/* Notification button */}
              <Link className="relative" href="/home/notifications">
                <BellIcon className="h-6 w-6 text" aria-hidden="true" />
                {notificationsCount > 0 && (
                  <span className="bg-red-500 h-5 w-5 top-0 -mt-1 text-center -pt-7 absolute right-0  text-white rounded-full">
                    <p className="-mt-1 p-1">{notificationsCount}</p>
                  </span>
                )}
              </Link>

              {/* Separator */}
              <div
                className="hidden mr-3 lg:block lg:h-6 lg:w-px lg:bg-main"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <div className="pr-7">
                <UserButton
                  appearance={{
                    baseTheme: isDarkTheme ? dark : undefined,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
