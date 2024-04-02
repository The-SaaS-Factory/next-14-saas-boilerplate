import PageName from "@/components/ui/commons/PageName";
import React from "react";
import { Metadata } from "next";
import { Card, Text, TextInput, Title } from "@tremor/react";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import CopyLinkButton from "../ui/CopyLinkButton";

export const metadata: Metadata = {
  title: "Link",
};

const LinkPage = async () => {
  const user = await getUserDB();

  return (
    <div>
      <PageName name={"Link"} isSubPage={true} />

      <main className="flex-1 overflow-y-auto lg:p-6">
        <section className="mb-8">
          <Card>
            <div className="flex flex-col">
              <Title>Tu link de afiliado</Title>
              <Text className="text-primary">Gana el 10% de todo los servicios comprados por tus usuarios referidos</Text>
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
        <section>
          {/* <Card>
            <CardHeader>
              <CardTitle>Link Performance</CardTitle>
              <CardDescription>
                View statistics for your referral link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col">
                  <CardDescription>Total Clicks</CardDescription>
                  <CardTitle>1,234</CardTitle>
                </div>
                <div className="flex flex-col">
                  <CardDescription>Sign Ups</CardDescription>
                  <CardTitle>123</CardTitle>
                </div>
                <div className="flex flex-col">
                  <CardDescription>Conversion Rate</CardDescription>
                  <CardTitle>10%</CardTitle>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </section>
      </main>
    </div>
  );
};

export default LinkPage;
