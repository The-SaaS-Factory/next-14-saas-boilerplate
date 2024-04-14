import React from "react";
import { ISupportTicket } from "@/interfaces/supportModule";
import { Card, Flex } from "@tremor/react";
import {
  formatTimestampToDateString,
  isValidJSON,
} from "@/utils/facades/serverFacades/strFacade";
import UserCard from "@/components/ui/commons/UserCard";
import AddMessageToSupportTicket from "./AddMessageToSupportTicket";
import CloseTicket from "./CloseTicket";
import Image from "next/image";
import Link from "next/link";
import { showTicketStatus } from "@/app/[locale]/(admin)/home/support/ui/SupportTicketsList";
import { useTranslations } from "next-intl";

const ViewSupportTicketDetailsPage = ({
  ticket,
  user,
}: {
  ticket: ISupportTicket;
  user: any;
}) => {
  const t = useTranslations("AdminLayout.pages.support");
  if (!ticket) return null;
  return (
    <div>
      <Card className="mr-3">
        <div className="flex flex-col justify-between space-y-3 lg:space-y-0 lg:flex-row">
          <div className="flex justify-between">
            <span className="subtitle">{t("subject")}: {ticket.subject}</span>
            <span className="subtitle ml-3">{t("ticket")} ID: {ticket.id}</span>
          </div>
          <div className="flex justify-between items-center space-x-3">
            <span className="subtitle">
            {t("status")}: {showTicketStatus(ticket.status)}
            </span>
            {ticket.status !== "CLOSED" && <CloseTicket ticketId={ticket.id} />}
          </div>
          <span className="subtitle">
          {t("date")}: {formatTimestampToDateString(ticket.createdAt)}
          </span>
        </div>
        <div className="mt-3">
          {ticket.SupportTicketMessage?.map((message: any) => {
            return message.SupportTicketMessageContent.filter(
              (content: any) =>
                content.type === "TEXT" && content.content !== ""
            ).map((text: any, index: number) => {
              return (
                <Card
                  key={`content${index}`}
                  className={`my-3 ${
                    message.userId == user?.id ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row">
                    <UserCard user={message.user ?? message.Organization} />{" "}
                    <span>
                      {formatTimestampToDateString(message.createdAt, true)}
                    </span>
                  </div>
                  <hr className="my-3" />
                  <Flex>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isValidJSON(text.content)
                          ? JSON.parse(text.content)
                          : text.content,
                      }}
                    ></div>
                  </Flex>
                  <Flex>
                    {message.SupportTicketMessageContent.filter(
                      (content: any) =>
                        content.type === "GALLERY" && content.content !== ""
                    ).map((image: any, index: number) => {
                      return (
                        <div key={`image${index}`}>
                          <Link target="_blank" href={image.content}>
                            <Image
                              src={image.content}
                              alt=""
                              width={160}
                              height={160}
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </Flex>
                </Card>
              );
            });
          })}
        </div>
      </Card>
      {(ticket.status == "AWAITING_RESPONSE" ||
        ticket.status == "UNDER_REVIEW" ||
        ticket.status == "OPEN") && (
        <AddMessageToSupportTicket ticket={ticket} />
      )}
    </div>
  );
};

export default ViewSupportTicketDetailsPage;
