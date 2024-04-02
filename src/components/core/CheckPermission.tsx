"use client";
import useSuperAdmin from "@/app/hooks/useSuperAdmin";
import React from "react";
import ForbiddenPage from "../layouts/errors/ForbiddenPage";

const CheckPermission = ({ permissionName }: { permissionName: string }) => {
  const { hasModulePermission } = useSuperAdmin(permissionName);

   
  
  if (!hasModulePermission) {
    return (
      <div className="">
        <ForbiddenPage />
      </div>
    );
  }
  
  return null;
};

export default CheckPermission;
