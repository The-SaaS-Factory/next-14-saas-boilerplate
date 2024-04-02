import prisma from "@/lib/db";
import { getSuperAdminAdmins } from "./scurityFacade";
import { User } from "@prisma/client";
import { sendMessageToTelegram } from "./telegramFacade";

export const sendInternalNotificatoin = async (
  userId: number,
  content: string,
  image?: string
): Promise<void> => {
  try {
    const payload = {
      userId: userId,
      image: image,
      content: content,
    };

    await prisma.notification.create({
      data: {
        userId: payload.userId,
        image: payload.image ?? "",
        type: "ALERT",
        content: payload.content,
      },
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const notifyToSuperAdmin = async (message: string) => {
  const admins = await getSuperAdminAdmins();

  await Promise.all(
    admins?.map((admin: User) => {
      sendInternalNotificatoin(admin.id, message);
    })
  );

  sendMessageToTelegram(message);
};
