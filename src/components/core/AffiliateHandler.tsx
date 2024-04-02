"use client";
import { storeAffiliateForUser } from "@/actions/global/affiliateSystem/store-affiliate-for-user";
import { useEffect } from "react";

function AffiliateHandler({
  aff,
  currentUser,
}: {
  aff: string | null;
  currentUser: any;
}) {
  const storeAffiliate = async (aff: string) => {
   await storeAffiliateForUser(Number(currentUser?.id), Number(aff))
      .then((data) => {
        console.log(data);
        localStorage.removeItem("aff");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (aff) {
      //Is in landing Page
      localStorage.setItem("aff", aff);
    } else {
      const aff = localStorage.getItem("aff");

      if (!aff) return;

      if (currentUser?.referredBy?.length > 0) return;

      storeAffiliate(aff);
      //Store in DB
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aff]);

  return <div></div>;
}

export default AffiliateHandler;
