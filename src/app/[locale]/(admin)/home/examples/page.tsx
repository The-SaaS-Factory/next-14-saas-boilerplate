import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Example Page",
};

const ExamplePage = () => {
  const t = useTranslations("AdminLayout.navigation");
  return (
    <div>
      <PageName
        name={t("exampleTitle")}
        btn1={{
          name: t("btnExample"),
          href: "/home/examples",
        }}
      />
    </div>
  );
};

export default ExamplePage;
