import { getSuperAdminSetting } from "./adminFacade";

export const sendMessageToTelegram = async (message: string) => {
  //With Api web
  const telegramGroupToken: string | null = await getSuperAdminSetting(
    "TELEGRAM_GROUP_TOKEN"
  );

  if (!telegramGroupToken) return;

  const telegramGroupId: string | null = await getSuperAdminSetting(
    "TELEGRAM_GROUP_ID"
  );

  if (!telegramGroupId) return;

  const url = `https://api.telegram.org/bot${telegramGroupToken}/sendMessage?chat_id=${telegramGroupId}&text=${message}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};
