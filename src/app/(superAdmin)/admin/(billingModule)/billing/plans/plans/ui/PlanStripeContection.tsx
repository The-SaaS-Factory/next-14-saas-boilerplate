"use client";
import { connectProductWithStripe } from "@/actions/superAdmin/superAdminBillingModule/stripeActions/connect-product-with-stripe";
import { PlanType } from "@/interfaces/billingModule";
import React from "react";
import { toast } from "sonner";

const PlanStripeContection = ({ plan }: { plan: PlanType }) => {
  
  const handleStripeConectionWithPlan = async () => {
    const promise = () =>
      new Promise((resolve, reject) =>
        connectProductWithStripe("Plan", {
          id: plan.id,
          name: plan.name,
        })
          .then(() => {
            resolve("Success");
          })
          .catch((e) => {
            reject(e.message);
          })
      );

    toast.promise(promise, {
      loading: "Loading",
      success: () => {
        return "Success";
      },
      error: (error) => {
        return error;
      },
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className=" ">
        <button onClick={handleStripeConectionWithPlan} className="btn-main">
          Connect Stripe
        </button>
      </div>
    </div>
  );
};

export default PlanStripeContection;
