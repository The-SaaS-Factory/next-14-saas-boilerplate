"use client";

import useSuperAdmin from "@/app/hooks/useSuperAdmin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectSuperAadminInLogin = ({ url }: { url: string }) => {
  const { isSuperAdmin } = useSuperAdmin();

  const navigate = useRouter();

  useEffect(() => {
    if (isSuperAdmin) {
      navigate.push(url);
    }
  }, [isSuperAdmin, navigate, url]);

  return <div></div>;
};
