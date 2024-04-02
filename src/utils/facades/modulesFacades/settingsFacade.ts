import { SettingType } from "@/interfaces/billingModule";

export const getSettingValue = (values: any, key: string) => {
    if (values === undefined) return null;
    if (Object.keys(values).length === 0) return null;
    return (
      values?.find((setting: SettingType) => setting.settingName === key)
        ?.settingValue ?? null
    );
  };
  