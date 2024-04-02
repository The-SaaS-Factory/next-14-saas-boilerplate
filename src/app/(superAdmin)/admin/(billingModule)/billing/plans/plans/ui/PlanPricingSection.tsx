import Link from "next/link";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import { deletePlanPrice } from "@/actions/superAdmin/superAdminBillingModule/delete-plan-price";
import { Plan, Pricing } from "@prisma/client";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import ConnectPricingWithStripe from "../../../../ui/ConnectPricingWithStripe";
import PlanStripeContection from "./PlanStripeContection";
import { IPricing } from "@/interfaces/billingModule";

const PlanPricingSection = async ({
  plan,
  pricings,
}: {
  plan: Plan;
  pricings: Pricing[];
}) => {
  const currencies = await getAllCurrencies();
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="space-y-12">
          <div className={`grid grid-cols-1 gap-x-8  md:grid-cols-3`}>
            <div className="lg:col-span-1 p-7">
              <h2 className="text-subtitle">Plan pricings</h2>
              <p className="mt-3 text-sm leading-6 text-primary">
                Manage pricings of this Plan
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col w-full max-w-md pt-7">
              <div className="flex justify-between">
                <Link
                  className="ml-4"
                  href={`/admin/billing/plans/plans/edit/${plan.id}/addPricing`}
                >
                  <button className="btn-icon">
                    <PlusCircleIcon className="w-6 h-6" />
                    Add Pricing
                  </button>
                </Link>
              </div>
              <div>
                {pricings?.map((pricing: IPricing, index: number) => (
                  <div
                    key={`currency-${index}`}
                    className="flex flex-col space-y-3   bg-main rounded-md shadow-md p-4 mt-4"
                  >  
                    <div className="flex w-full justify-between">
                      <span className="text-lg text-primary">
                        ${pricing.price.toFixed(2)} (ID: {pricing.id})
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm text-primary">
                          Frequency: {pricing.frequency}
                        </span>
                        <span className="text-sm text-primary">
                          Estado: {pricing.status}
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/billing/plans/plans/edit/${plan.id}/editPricing/${pricing.id}`}
                        >
                          <button className="btn-icon">
                            <PencilIcon className="w-6 h-6" />
                          </button>
                        </Link>

                        <DeleteModel
                          modelId={pricing.id as number}
                          primaryModelId={plan.id as number}
                          deleteAction={deletePlanPrice}
                        />
                      </div>
                    </div>
                    <hr />
                    <span>Stripe Price Connection</span>
                    {plan.stripeProductId ? (
                      <ConnectPricingWithStripe
                        pricing={pricing}
                        currencies={currencies}
                        settings={pricing.settings}
                        path={`/admin/billing/plans/plans/edit/${plan.id}`}
                        stripeProductId={plan.stripeProductId}
                      />
                    ) : (
                      <div className="flex flex-col bg-main rounded-md items-center p-7">
                        <span className="text-primary">
                          Please connect the plan with stripe first
                        </span>

                        <PlanStripeContection plan={plan} />
                      </div>
                    )}
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

export default PlanPricingSection;
