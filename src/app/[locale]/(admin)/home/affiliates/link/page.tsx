import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { Card, Text, TextInput, Title } from "@tremor/react";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import CopyLinkButton from "../ui/CopyLinkButton";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Link",
};

const LinkPage = async () => {
  const user = await getUserDB();
  const t = await getTranslations("AdminLayout.pages.affiliates");

  return (
    <div>
      <PageName name={t("link")} isSubPage={true} />

      <main className="flex-1 overflow-y-auto lg:p-6">
        <section className="mb-8">
          <Card>
            <div className="flex flex-col">
              <Title>{t("referralLink")}</Title>
              <Text className="text-primary">
                {t("referralLinkDescription")}
              </Text>
            </div>
            <div className="flex items-center mt-3 justify-between">
              <TextInput
                className="cursor-pointer"
                readOnly
                type="text"
                value={`https://hostingclan.com?aff=${user.id}`}
              />
              <CopyLinkButton userId={user.id} />
            </div>
          </Card>
        </section>
        <section></section>
      </main>
    </div>
  );
};

export default LinkPage;
