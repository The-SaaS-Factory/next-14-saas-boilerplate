import NewForm from "@/components/core/NewForm";
import { upsertPaymentMethod } from "@/actions/superAdmin/superAdminBillingModule/upsertPaymentMethod";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import { AdminCurrencies } from "@prisma/client";

const UpsertPaymentMethod = async ({
  paymentMethodId,
  values,
}: {
  paymentMethodId?: number;
  values?: any;
}) => {
  const currencies = await getAllCurrencies();
  const formInfo = {
    name: "Manage Payment Method",
    description: " Manage Payment Method",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "image",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        {
          optionName: "Active",
          optionValue: "1",
        },
        {
          optionName: "Inactive",
          optionValue: "0",
        },
      ],
    },
    {
      name: "currencies",
      label: "Currencies",
      type: "multiselect",
      required: true,
      options: currencies?.map((currency: AdminCurrencies) => ({
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
        modelToUpdate={paymentMethodId}
        onSubmit={upsertPaymentMethod}
      />
    </>
  );
};

export default UpsertPaymentMethod;
