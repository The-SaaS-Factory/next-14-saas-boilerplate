import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import Search from "@/components/ui/commons/Search";
import CouponsList from "./ui/CouponsList";

export const metadata: Metadata = {
  title: "Coupons",
};

const SuperAdminBillingCouponsModule = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <div>
      <PageName
        name={"Cupones"}
        btn1={{
          name: "Crear cupón",
          href: "/admin/billing/coupons/add",
        }}
      />
      <Search placeholder="Search coupon for ID" />
      <CouponsList query={query} currentPage={currentPage} />
    </div>
  );
};

export default SuperAdminBillingCouponsModule;
