import NewForm from "@/components/core/NewForm";
import { upsertCurrency } from "@/actions/superAdmin/superAdminBillingModule/upsert-currencies";
 
const UpsertCurrency = ({
  planId,
  values,
}: {
  planId?: number;
  values?: any;
}) => {
  const formInfo = {
    name: "Manage Currency",
    description: " Manage Currency",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "rate",
      label: "Rate",
      type: "number",
      required: true,
      note: "Rate in USD",
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      note: "Currency Code in lowercase. ej: usd, brl, eur, etc.",
    },
    {
      name: "main",
      label: "Main Currency",
      type: "select",
      required: true,
      options: [
        {
          optionName: "Yes",
          optionValue: "1",
        },
        {
          optionName: "No",
          optionValue: "0",
        },
      ],
    },
  ];

  return (
    <>
      
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={planId}
        onSubmit={upsertCurrency}
      />
    </>
  );
};

export default UpsertCurrency;
