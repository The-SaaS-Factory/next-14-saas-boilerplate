import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { getPaymentMethods } from "@/actions/superAdmin/superAdminBillingModule/get-all-payment-methods";
import { PaymentMethod } from "@prisma/client";
import { deletePaymentMethod } from "@/actions/superAdmin/superAdminBillingModule/delete-payment-methods";

const 
PaymentMethodsSection = async () => {
  const paymentMethods = await getPaymentMethods();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8  md:grid-cols-3`}>
            <div className="lg:col-span-1 p-7">
              <h2 className="text-subtitle">Payment Methods</h2>
              <p className="mt-3 text-sm leading-6 text-primary">
                Manage payments gateways and methods.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col w-full max-w-md pt-7">
              <div className="flex justify-between">
                <h2 className="text-subtitle">
                 Payment Methods Added
                  <span className="text-sm">({paymentMethods?.length})</span>
                </h2>
                <Link
                  className="ml-3"
                  href="/admin/settings/billing/addPaymentMethod"
                >
                  <button className="btn-icon">
                    <PlusCircleIcon className="w-6 h-6" />
                    Add Payment Method
                  </button>
                </Link>
              </div>
              <div>
                {paymentMethods?.map((payment: PaymentMethod, index: number) => (
                  <div
                    key={`currency-${index}`}
                    className="flex flex-row justify-between items-center bg-main rounded-md shadow-md p-4 mt-4"
                  >
                    <div className="flex w-full justify-between">
                      <span className="text-sm text-primary">
                        {payment.name}
                      </span>
                     
                      <span className="text-sm text-primary">
                        Estado: {payment.status}
                      </span>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/settings/billing/editPaymentMethod/${payment.id}`}
                        >
                          <button className="btn-icon">
                            <PencilIcon className="w-6 h-6" />
                          </button>
                        </Link>

                        <DeleteModel
                          modelId={payment.id}
                          deleteAction={deletePaymentMethod}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;
