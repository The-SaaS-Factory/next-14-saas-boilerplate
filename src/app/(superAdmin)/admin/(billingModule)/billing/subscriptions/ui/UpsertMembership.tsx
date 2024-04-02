import NewForm from "@/components/core/NewForm";
import { upsertMembership } from "@/actions/superAdmin/superAdminBillingModule/upsert-membership";

const UpsertMembership = async ({
  membershipId,
  values,
  currencies,
  plans,
}: {
  membershipId?: number;
  values?: any;
  currencies?: any;
  plans?: any;
}) => {
  const formInfo = {
    name: "Manage membership",
    description: "Manage membership",
  };

  const fields = [
    {
      name: "userId",
      label: "User Id",
      type: "number",
      required: true,
    },
    {
      name: "planId",
      label: "Plan",
      type: "select",
      required: true,
      forceInteger: true,
      options: plans?.map((plan: any) => ({
        optionName: plan.name,
        optionValue: plan.id,
      })),
    },
    {
      name: "pricingId",
      label: "Price Id",
      type: "number",
      required: true,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      name: "endDateFreeTrial",
      label: "End free trial Date",
      type: "date",
      required: false,
    },
    {
      name: "currencyId",
      label: "Moneda",
      type: "select",
      required: true,
      forceInteger: true,
      options: currencies?.map((currency: any) => ({
        optionName: currency.name,
        optionValue: currency.id,
      })),
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={membershipId}
        onSubmit={upsertMembership}
      />
    </>
  );
};

export default UpsertMembership;
