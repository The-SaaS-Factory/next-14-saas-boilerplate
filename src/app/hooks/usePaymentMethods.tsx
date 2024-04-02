"use client";

import { payInvoiceWitWallet } from "@/actions/admin/walletModule/pay-with-wallet";
import {
  PlanInvoiceType,
  createPlanInvoice,
} from "@/actions/superAdmin/superAdminBillingModule/create-plan-invoice";
import { createCheckoutSession } from "@/actions/superAdmin/superAdminBillingModule/stripeActions/create-checkout-session";
import { PaymentMethod } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const usePaymentMethods = (
  currencyId: number,
  paymentMethods: PaymentMethod[]
) => {
  const [hasPaymentMethods, setHasPaymentMethods] = useState(false);
  const [paymentMethosAvailables, setPaymentMethosAvailables] = useState<
    PaymentMethod[]
  >([]);

  useEffect(() => {
    const hasPaymentMethods = paymentMethods?.filter((paymentMethod) => {
      const currencies = JSON.parse(paymentMethod.currencies as string);

      if (Array.isArray(currencies)) {
        return currencies.find((currency: any) => {
          return parseInt(currency) === currencyId;
        });
      } else {
        return false;
      }
    });

    setHasPaymentMethods(hasPaymentMethods.length > 0 ? true : false);
    setPaymentMethosAvailables(hasPaymentMethods);
  }, [currencyId, paymentMethods]);

  const payWithStripe = async (model = "INVOICE", modelId: number) => {
    if (model === "INVOICE") {
      await createCheckoutSession(modelId, "SERVICE")
        .then((res: any) => {
          window.location.href = res.url;
        })
        .catch((err) => {
          toast.error("Error creating checkout session:" + " " + err.message);
          console.log(err);
        });
    } else if (model === "PLAN") {
      await createStripeCkeckoutSubscription({
        currencyId: currencyId,
        priceId: modelId,
        paymentMethodName: "Stripe",
      });
    }
  };

  const payWithCUP = async (model = "INVOICE", modelId: number) => {
    //Open window link with link to wathsapp wit invoice number
    if (model === "INVOICE") {
      window.open(
        `https://wa.me/+5541999568376?text=Hola,%20quisiera%20pagar%20mi%20factura%20con%20el%20id%20${modelId}`,
        "_blank"
      );
    } else if (model === "PLAN") {
      await createPlanInvoice({
        payload: {
          currencyId: currencyId,
          priceId: modelId,
          paymentMethodName: "CUP",
        },
      })
        .then((data) => {
          window.open(
            `https://wa.me/+5541999568376?text=Hola,%20quisiera%20pagar%20mi%20factura%20con%20el%20id%20${data.id}`,
            "_blank"
          );
        })
        .catch((error) => {
          toast.error(error.message);
          return null;
        });
    }
  };
  const payWithQvapay = async (model = "INVOICE", modelId: number) => {
    //Open window link with link to wathsapp wit invoice number
    if (model === "INVOICE") {
      window.open(
        `https://wa.me/+5541999568376?text=Hola,%20quisiera%20pagar%20mi%20factura%20con%20el%20id%20${modelId}`,
        "_blank"
      );
    } else if (model === "PLAN") {
      await createPlanInvoice({
        payload: {
          currencyId: currencyId,
          priceId: modelId,
          paymentMethodName: "QVAPAY",
        },
      })
        .then((data) => {
          window.open(
            `https://wa.me/+5541999568376?text=Hola,%20quisiera%20pagar%20mi%20factura%20con%20el%20id%20${data.id}`,
            "_blank"
          );
        })
        .catch((error) => {
          toast.error(error.message);
          return null;
        });
    }
  };

  const createStripeCkeckoutSubscription = async (payload: PlanInvoiceType) => {
    let invoiceId = null;

    await createPlanInvoice({
      payload,
    })
      .then((data) => {
        invoiceId = data.id;
      })
      .catch((error) => {
        toast.error(error.message);
        return null;
      });

    if (!invoiceId) {
      toast.error("Error creating invoice");
      return;
    }

    await createCheckoutSession(invoiceId, "PLAN")
      .then((data) => {
        window.location.href = data.url as string;
      })
      .catch((error) => {
        toast.error(error.message);
        return null;
      });
  };

  const payWithWallet = async (model = "INVOICE", modelId: number) => {
    if (model === "INVOICE") {
      await payInvoiceWitWallet(modelId)
        .then(() => {
          toast.success("Invoice paid successfully");
        })
        .catch((err: any) => {
          toast.error("Error paying invoice:" + " " + err.message);
          console.log(err);
        });
    } else if (model === "PLAN") {
      await createPlanInvoice({
        payload: {
          currencyId: currencyId,
          priceId: modelId,
          paymentMethodName: "WALLET",
        },
      })
        .then(async (data) => {
          await payInvoiceWitWallet(data.id)
            .then(() => {
              toast.success("Invoice paid successfully");
            })
            .catch((err: any) => {
              toast.error("Error paying invoice:" + " " + err.message);
              console.log(err);
            });
        })
        .catch((error) => {
          toast.error(error.message);
          return null;
        });
    }
  };

  return {
    hasPaymentMethods,
    paymentMethosAvailables,
    payWithStripe,
    payWithCUP,
    payWithQvapay,
    payWithWallet,
  };
};

export default usePaymentMethods;
