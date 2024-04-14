"use client";
import useSuperAdmin from "@/app/hooks/useSuperAdmin";
import { ReactNode } from "react";
import ForbiddenPage from "./errors/ForbiddenPage";
import PageLoader from "../ui/loaders/PageLoader";

export default function SuperAdminMiddleware({
  children,
}: {
  children: ReactNode;
}) {
  const { isSuperAdmin, loadingIsSuperAdmin } = useSuperAdmin();

  if (loadingIsSuperAdmin) {
    return (
      <div className="p-14">
        <PageLoader />
      </div>
    );
  }

  

  return <>{isSuperAdmin ? children : <ForbiddenPage />}</>;
}
