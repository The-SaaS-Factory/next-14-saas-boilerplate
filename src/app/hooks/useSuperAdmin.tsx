"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useState } from "react";

export const checkModulePermission = (
  permissions: string[],
  module: string
) => {
  if (permissions && permissions.length > 0) {
    const modulePermissions = permissions.filter((permission) =>
      permission.startsWith(module)
    );
    if (modulePermissions.length > 0) {
      return true;
    }
  }
  return false;
};

export const hasSuperAdminPermission = (permissions: string[]) => {
  if (permissions && permissions.length > 0) {
    const superAdminPermissions = permissions.filter((permission) =>
      permission.startsWith("superAdmin")
    );
    if (superAdminPermissions.length > 0) {
      return true;
    }
  }
  return false;
};

import { useMemo } from "react";

const useSuperAdmin = (moduleName?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);
  const [hasModulePermission, setHasModulePermission] =
    useState<boolean>(false);
  const { organization } = useOrganization();
  const { user } = useUser();

  

  useMemo(() => {
    try {
      if (
        (organization && organization.publicMetadata?.isSuperAdmin) ||
        (organization &&
          hasSuperAdminPermission(
            organization.publicMetadata?.permissions as string[]
          ))
      ) {
        if (moduleName) {
          setHasModulePermission(
            checkModulePermission(
              organization.publicMetadata?.permissions as string[],
              moduleName
            )
          );
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setIsSuperAdmin(true);
      } else {
        if (
          (user && user.publicMetadata?.isSuperAdmin) ||
          (user &&
            hasSuperAdminPermission(
              user.publicMetadata?.permissions as string[]
            ))
        ) {
          if (moduleName) {
            setHasModulePermission(
              checkModulePermission(
                user.publicMetadata?.permissions as string[],
                moduleName
              )
            );
          }
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          setIsSuperAdmin(true);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          setIsSuperAdmin(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [organization, moduleName]);

  return {
    loadingIsSuperAdmin: loading,
    isSuperAdmin,
    hasModulePermission,
  };
};

export default useSuperAdmin;
