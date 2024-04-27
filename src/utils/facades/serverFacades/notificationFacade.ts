import prisma from "@/lib/db";
import { getSuperAdminAdmins } from "./scurityFacade";
import { User } from "@prisma/client";
import { sendMessageToTelegram } from "./telegramFacade";
import { sendLoopsTransactionalEventToUser } from "./loopsEmailMarketingFacade";
import { constants } from "@/lib/constants";

const notificationLoopsId = process.env.NOTIFICATION_LOOPS_ID;

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

    if (notificationLoopsId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user?.email) {
        const payload = {
          transactionalId: notificationLoopsId,
          email: user.email,
          dataVariables: {
            notification: content,
            subject: `Notification from ${constants.appName}`,
          },
        };

        await sendLoopsTransactionalEventToUser(payload).catch((error) => {
          throw new Error(`Error al enviar email ${error.message}`);
        });
      }
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const notifyToSuperAdmin = async (message: string) => {
  const admins = await getSuperAdminAdmins();

  await Promise.all(
    admins?.map((admin: User) => {
      sendInternalNotificatoin(admin.id, message);
      if (admin.email)
        sendNotificationViaEmail(
          admin.email,
          message,
          message.substring(0, 20) +
            "... | " +
            "Notification from " +
            constants.appName
        );
    })
  );

  sendMessageToTelegram(message);
};

export const sendNotificationViaEmail = async (
  email: string,
  content: string,
  subject: string
): Promise<void> => {
  if (!notificationLoopsId) return;

  const payload = {
    transactionalId: notificationLoopsId,
    email: email,
    dataVariables: {
      notification: content,
      subject: subject,
    },
  };

  return await sendLoopsTransactionalEventToUser(payload).catch((error) => {
    throw new Error(`Error al enviar email ${error.message}`);
  });
};
