"use client";
import React from "react";
import { Card, Flex, ProgressBar, Text } from "@tremor/react";
import { PlanCapabilitieType } from "@/interfaces/userModule";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const PlanActive = ({
  planCapabilities,
  usedCapabilities,
}: {
  planCapabilities: PlanCapabilitieType[];
  usedCapabilities: any[];
}) => {
  const t = useTranslations("AdminLayout.pages.plans");
  const getUserCountCapabilitie = (capabilitieId: number) => {
    const capabilitie = usedCapabilities?.find(
      (c: any) => c.capabilitieId === capabilitieId
    );
    return capabilitie ? capabilitie.count : 0;
  };

  const getPorcent = (userCount: number, planCount: number) => {
    return (userCount * 100) / planCount;
  };

  return (
    <div>
      <Card className="my-7">
        {planCapabilities?.filter((c: any) => c.capabilitie?.type === "LIMIT")
          .length > 0 && (
          <div>
            <h2 className="title">{t("currentUsage")}:</h2>
            <div className="grid mt-10 grid-cols-1 gap-4 lg:grid-cols-3">
              {planCapabilities
                ?.filter((c: any) => c.capabilitie.type === "LIMIT")
                .map((capabilitie: any, index: number) => (
                  <Flex key={`capabilitie-${index}`}>
                    <Card className="max-w-lg mx-auto">
                      <Text>{capabilitie.capabilitie?.name}</Text>
                      <Flex>
                        <Text>
                          {getUserCountCapabilitie(capabilitie.capabilitieId)}
                        </Text>
                        <Text>max {capabilitie.count}</Text>
                      </Flex>
                      <ProgressBar
                        value={getPorcent(
                          getUserCountCapabilitie(capabilitie.capabilitieId),
                          capabilitie.count
                        )}
                        color="sky"
                        className="mt-3"
                      />
                    </Card>
                  </Flex>
                ))}
            </div>
            <hr className="my-7" />
          </div>
        )}
        <div>
          <h2 className="title">{t("planFeaturesAndLImit")} :</h2>
          <ul
            role="list"
            className="divide-y my-3 grid grid-cols-2 lg:grid-cols-1 space-y-3 divide-gray-100"
          >
            {planCapabilities?.map((capa: any, index: number) => (
              <li
                key={`capa-${index}`}
                className="items-center flex space-x-3 p-1"
              >
                {capa.capabilitie.type === "PERMISSION" ? (
                  capa.count == 1 ? (
                    <button className="btn-icon  mr-2">
                      {" "}
                      <CheckBadgeIcon className="text-green-500 h-5 w-5" />
                    </button>
                  ) : (
                    <button className="btn-icon  mr-2">
                      {" "}
                      <XMarkIcon className="text-red-500 h-5 w-5" />
                    </button>
                  )
                ) : (
                  capa.count
                )}{" "}
                {capa.capabilitie.name}{" "}
                {capa.capabilitie.type === "LIMIT" && "/ month"}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PlanActive;
