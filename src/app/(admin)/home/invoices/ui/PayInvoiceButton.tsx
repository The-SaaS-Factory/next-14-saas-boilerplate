"use client";
import Image from "next/image";

import { PaymentMethod } from "@prisma/client";
import { IInvoice } from "@/interfaces/billingModule";
import usePaymentMethods from "@/app/hooks/usePaymentMethods";

const PayInvoiceButton = ({
  invoice,
  paymentMethods,
}: {
  invoice: IInvoice;
  paymentMethods: PaymentMethod[];
}) => {
  const { paymentMethosAvailables, payWithStripe, payWithQvapay, payWithCUP, payWithWallet } = usePaymentMethods(
    Number(invoice.Currency?.id),
    paymentMethods
  );

  const handleSelectPaymentMethod = (paymentMethod: any) => {
    if (paymentMethod.name === "Stripe") {
      payWithStripe('INVOICE',invoice.id);
    }
    if (paymentMethod.name === "CUP en Cuba") {
      payWithCUP('INVOICE',invoice.id);
    }
    if (paymentMethod.name === "QvaPay") {
      payWithQvapay('INVOICE',invoice.id);
    }
    if (paymentMethod.name === "Wallet") {
      payWithWallet('INVOICE',invoice.id);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-3 my-7">
        {paymentMethosAvailables.map((paymentMethod) => {
          return (
            <div className="flex space-x-3 items-center" key={paymentMethod.id}>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
                onClick={() => {
                  handleSelectPaymentMethod(paymentMethod);
                }}
              >
                Pay with {paymentMethod.name}
                {paymentMethod.image && (
                  <Image
                    width={100}
                    height={30}
                    src={paymentMethod.image}
                    className=" ml-3 h-5  w-auto"
                    alt="Stripe"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PayInvoiceButton;
