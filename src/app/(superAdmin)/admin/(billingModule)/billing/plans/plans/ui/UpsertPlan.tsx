import NewForm from "@/components/core/NewForm";
import { upsertPlan } from "@/actions/superAdmin/superAdminBillingModule/upsert-plan";

const UpsertPlan = ({ planId, values }: { planId?: number; values?: any }) => {
  const formInfo = {
    name: "Create Plan",
    description: "Create a new plan for your organization",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
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
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={planId}
        onSubmit={upsertPlan}
      />
    </>
  );
};

export default UpsertPlan;
