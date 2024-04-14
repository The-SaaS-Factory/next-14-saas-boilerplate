"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const PaymentStatusAlert = ({ status }: { status: string | undefined }) => {
  useEffect(() => {
    if (!status) return;
    if (status === "unpaid") {
      toast.error(
        "Your payment is overdue. Please pay your bill to continue using the service."
      );
    }

    if (status === "pending") {
      toast.info(
        "Your payment is pending. Please wait for the payment to be processed."
      );
    }

    if (status === "success") {
      toast.success(
        "Your payment is complete. Thank you for using our service."
      );
    }

    if (status === "cancelled") {
      toast.error(
        "Your payment is cancelled. Please pay your bill to continue using the service."
      );
    }
  }, [status]);

  return <div></div>;
};

export default PaymentStatusAlert;
