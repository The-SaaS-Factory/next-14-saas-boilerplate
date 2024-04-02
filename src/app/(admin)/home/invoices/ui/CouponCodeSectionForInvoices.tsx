"use client";
import { applyCouponToInvoice } from "@/actions/superAdmin/superAdminBillingModule/coupons/apply-coupon-to-invoice";
import { TextInput } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

const CouponCodeSectionForInvoices = ({ invoiceId }: { invoiceId: number }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCouponToInvoice = async () => {
    await applyCouponToInvoice({
      couponCode,
      invoiceId,
    })
      .then(() => {
        toast.success("Cupón aplicado correctamente");
      })
      .catch(() => {
        toast.error("No se pudo aplicar el cupón");
      });
  };

  return (
    <div className="flex flex-col space-y-3">
      <h2 className="text-subtitle">Aplica un cupón de descuento</h2>
      <TextInput onValueChange={setCouponCode} />
      <button className="btn-main" onClick={handleApplyCouponToInvoice}>
        Aplicar
      </button>
    </div>
  );
};

export default CouponCodeSectionForInvoices;
