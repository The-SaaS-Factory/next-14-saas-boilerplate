"use client";
import { addMessageSupportTicket } from "@/actions/global/supportModule/add-message-support-ticket";
import NewForm from "@/components/core/NewForm";
import { ISupportTicket } from "@/interfaces/supportModule";
import { Card } from "@tremor/react";

const AddMessageToSupportTicket = ({ ticket }: { ticket: ISupportTicket }) => {
  const fields = [
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      required: true,
    },
    {
      name: "images",
      label: "Imágenes",
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
          <h2 className="text-subtitle">Adicionar mensaje</h2>
          <NewForm fields={fields} 
          customSaveButtonText="Enviar"
          onSubmit={handleCreateNewMessage} />
        </div>
      </Card>
    </div>
  );
};

export default AddMessageToSupportTicket;
