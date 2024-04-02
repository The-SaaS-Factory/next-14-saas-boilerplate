"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
export const saveSuperAdminSettings = async (settings: any) => {
  try {
    await Promise.all(
      settings.map(async (setting: any) => {
        try {
          const existingSetting = await prisma.superAdminSetting.findFirst({
            where: {
              settingName: setting.settingName,
            },
          });

         
          if (existingSetting) {
            await prisma.superAdminSetting.update({
              where: { id: existingSetting.id },
              data: {
                settingValue:
                  typeof setting.settingValue === "number"
                    ? setting.settingValue.toString()
                    : setting.settingValue,
              },
            });
          } else {
            await prisma.superAdminSetting.create({
              data: {
                settingName: setting.settingName,
                settingValue:
                  typeof setting.settingValue === "number"
                    ? setting.settingValue.toString()
                    : setting.settingValue,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      })
    )
    .catch((err) => {
      console.log(err);
    });

    revalidatePath("/admin/settings");

    return "ok";
  } catch (error) {
    console.log(error);

    return {
      errors: [error],
    };
  }
};
