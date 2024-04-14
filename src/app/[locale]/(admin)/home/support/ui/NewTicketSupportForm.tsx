"use client";
import { createSupportTickets } from "@/actions/global/supportModule/create-support-ticket";
import NewForm from "@/components/core/NewForm";
import { useSideOverState } from "@/states/ui/slideOverState";
import { SupportDepartamentType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";

const NewTicketSupportForm = () => {
  const t = useTranslations("AdminLayout.pages.support");

  const fields = [
    {
      name: "subject",
      label:  t("subject"),
      type: "text",
      required: true,
    },
    {
      name: "departament",
      label: t("departament"),
      type: "select",
      required: true,
      options: [
        {
          optionName: t("billing"),
          optionValue: SupportDepartamentType.BILLING,
        },
        {
          optionName:   t("sales"),
          optionValue: SupportDepartamentType.SALES,
        },
        {
          optionName: t("support"),
          optionValue: SupportDepartamentType.SUPPORT,
        },
      ],
    },
    {
      name: "description",
      label:  t("description"),
      type: "textarea",
      required: true,
    },
    {
      name: "images",
      label: t("images"),
      type: "gallery",
      required: true,
    },
  ];
  const { toggleSideOver } = useSideOverState(
    ({ toggleSideOver, isSideOverOpen }) => ({ toggleSideOver, isSideOverOpen })
  );

  const handleSendForm = async (data: any) => {
    toggleSideOver();
    return await createSupportTickets(data);
  };

  return (
    <>
      <NewForm fields={fields} onSubmit={handleSendForm}
      customSaveButtonText={t("sendTicket")}
       
      />
    </>
  );
};

export default NewTicketSupportForm;
