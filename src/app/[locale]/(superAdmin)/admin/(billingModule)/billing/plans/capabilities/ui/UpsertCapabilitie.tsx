import NewForm, { Field } from "@/components/core/NewForm";
import { upsertCapabilitie } from "@/actions/superAdmin/superAdminBillingModule/upsert-capabilitie";

const UpsertCapabilitie = ({
  capabilitieId,
  values,
}: {
  capabilitieId?: number;
  values?: any;
}) => {
  const formInfo = {
    name: "Manage Capabilitie",
    description: "Create a new plan capabilitie",
  };

  const fields: Field[] = [
    {
      name: "title",
      label: "Name",
      type: "text",
      required: true,
      hasLanguageSupport: true,
    },
    {
      name: "name",
      label: "Identifier",
      type: "text",
      required: true,
      note: "35% cashback for affiliates,",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: [
        {
          optionName: "LIMIT",
          optionValue: "LIMIT",
        },
        {
          optionName: "PERMISSION",
          optionValue: "PERMISSION",
        },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      hasLanguageSupport: true,
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={capabilitieId}
        onSubmit={upsertCapabilitie}
      />
      <div className="max-w-lg px-10 mx-auto">

      
      </div>
    </>
  );
};

export default UpsertCapabilitie;
