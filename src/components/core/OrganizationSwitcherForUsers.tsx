"use client";
import {
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";
import { Select, SelectItem } from "@tremor/react";
import Image from "next/image";

function OrganizationsSwitcherForUser() {
  const { isLoaded, setActive } = useOrganizationList();
  const { organization } = useOrganization();
  const { user } = useUser();
  const { getToken } = useAuth();

  const token = getToken();

  if (!isLoaded) {
    return (
      <div className="animate-pulse bg-gray-300 rounded-2xl h-8 w-48"></div>
    );
  }

  const handleOrgChange = (value: string) => {
    if (!value) return;
    setActive && setActive({ organization: value });
  };

  if (user?.organizationMemberships.length === 0) return null;

  return (
    <div>
      <Select
        onValueChange={handleOrgChange}
        placeholder={organization?.name ?? "Perfil personal"}
      >
        {token && organization && (
          <SelectItem value={token as unknown as string}>
            <div className="flex space-x-3 cursor-pointer items-center">
              {user?.imageUrl && (
                <Image
                  src={user?.imageUrl}
                  alt="Perfil Personal logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              )}
              <span> Perfil personal</span>
            </div>{" "}
          </SelectItem>
        )}
        {user?.organizationMemberships?.map((organizationM: any) => (
          <SelectItem
            key={organizationM.id}
            value={organizationM.organization.id}
          >
            <div className="flex space-x-3 cursor-pointer items-center">
              <Image
                src={organizationM.organization.imageUrl}
                alt="organization logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span>{organizationM.organization.name}</span>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default OrganizationsSwitcherForUser;
