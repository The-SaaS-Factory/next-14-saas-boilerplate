import { UserType } from "./userModule";

export interface ISupportTicket {
  id: number;
  subject: string;
  departament: string;
  status: string;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
  user?: UserType | undefined | null;
  SupportTicketMessage?: SupportTicketMessage[];
}

export interface SupportTicketMessage {
  id: number;
  ticketId: number;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
  SupportTicketMessageContent?: SupportTicketMessageContent[];
}

export interface SupportTicketMessageContent {
  id: number;
  messageId?: number;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
