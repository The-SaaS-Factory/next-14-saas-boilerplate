import NewForm from "@/components/core/NewForm";
import { Plan, frequencyType } from "@prisma/client";
import { getAllPlans } from "@/actions/superAdmin/superAdminBillingModule/get-all-plans";
import { upsertPlanPrice } from "@/actions/superAdmin/superAdminBillingModule/upsert-plan-price";

const UpsertPlanPricing = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const { data } = await getAllPlans();
  const formInfo = {
    name: "Add Plan Pricing",
    description: " Manage Plan Pricing",
  };

  const fields = [
    {
      name: "planId",
      label: "Plan",
      type: "select",
      required: true,
      forceInteger: true,
      options: data?.map((plan: Plan) => ({
        optionName: plan.name,
        optionValue: plan.id,
      })),
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
      note:"If you change the price,  you should also change the price in Stripe",
    },
    {
      name: "frequency",
      label: "Frequency",
      type: "select",
      required: true,
      options: Object.values(frequencyType).map((frequency) => ({
        optionName: frequency,
        optionValue: frequency,
      })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        {
          optionName: "Active",
          optionValue: "ACTIVE",
        },
        {
          optionName: "Inactive",
          optionValue: "INACTIVE",
        },
      ],
      required: true,
    },
  ];
 
  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        onSubmit={upsertPlanPrice}
      />
    </>
  );
};

export default UpsertPlanPricing;
