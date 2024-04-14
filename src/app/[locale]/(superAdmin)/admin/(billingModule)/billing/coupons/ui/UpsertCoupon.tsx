import NewForm from "@/components/core/NewForm";
import { CouponDuration } from "@prisma/client";
import { upsertCoupon } from "@/actions/superAdmin/superAdminBillingModule/coupons/upsert-coupon";
import { getAllUser } from "@/actions/superAdmin/superAdminUsersModule/get-all-user";

const UpsertCoupon = async ({
  modelId,
  values,
}: {
  modelId?: number;
  values?: any;
}) => {
  const users = await getAllUser({ args: { limit: 5000 } });

  const formInfo = {
    name: "Adicionar Cupón",
    description: "Adicionar un nuevo cupón al sistema.",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "amountOff",
      label: "Cantidad de descuento fija",
      type: "number",
      required: false,
    },
    {
      name: "percentOff",
      label: "% de descuento",
      type: "number",
      required: false,
    },
    {
      name: "durationInMonths",
      label: "Meses de duración",
      type: "number",
      required: false,
    },
    {
      name: "maxRedemptions",
      label: "Usos máximos",
      type: "number",
      required: false,
    },
    {
      name: "userId",
      label: "Usuario dueño del cupón",
      type: "searchselect",
      required: false,
      forceInteger: true,
      options:
        users.data.length > 0
          ? users.data?.map((user) => ({
              optionValue: user.id as number,
              optionName: user.name  + " - " + user.id,
            }))
          : [],
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      required: false,
      options: [
        {
          optionValue: "INACTIVE",
          optionName: "Inactivo",
        },
        {
          optionValue: "ACTIVE",
          optionName: "Activo",
        },
      ],
    },
    {
      name: "duration",
      label: "Duración del cupón",
      type: "select",
      required: true,
      options: Object.keys(CouponDuration).map((key) => ({
        optionValue: key,
        optionName: key,
      })),
    },
  ];

  return (
    <>
      <NewForm
        values={values ?? []}
        info={formInfo}
        fields={fields}
        modelToUpdate={modelId}
        onSubmit={upsertCoupon}
      />
    </>
  );
};

export default UpsertCoupon;
