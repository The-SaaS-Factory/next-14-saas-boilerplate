"use client";
import { addMessageSupportTicket } from "@/actions/global/supportModule/add-message-support-ticket";
import NewForm from "@/components/core/NewForm";
import { ISupportTicket } from "@/interfaces/supportModule";
import { Card } from "@tremor/react";
import { useTranslations } from "next-intl";

const AddMessageToSupportTicket = ({ ticket }: { ticket: ISupportTicket }) => {
  const t = useTranslations("AdminLayout.pages.support");
  const fields = [
    {
      name: "description",
      label: t("description"),
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

  const handleCreateNewMessage = async (data: any) => {
    const { description, images } = data.payload;

    const newMessage = {
      description,
      images,
      ticketId: ticket.id,
    };

    await addMessageSupportTicket(newMessage);
  };

  return (
    <div>
      <Card className="mt-7 w-full  flex">
        <div className="flex flex-col w-full lg:w-1/2 mx-auto">
          <h2 className="text-subtitle">{t("addMessage")}</h2>
          <NewForm
            fields={fields}
            customSaveButtonText={t("send")}
            onSubmit={handleCreateNewMessage}
          />
        </div>
      </Card>
    </div>
  );
};

export default AddMessageToSupportTicket;
