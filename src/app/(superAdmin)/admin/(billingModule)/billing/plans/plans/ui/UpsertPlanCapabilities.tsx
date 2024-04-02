"use client";
import { connectCapabilitieWithPlan } from "@/actions/superAdmin/superAdminBillingModule/connect-capabilitie-with-plan";
import { Capabilitie } from "@prisma/client";
import { Select, SelectItem, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { toast } from "sonner";

const UpsertPlanCapabilities = ({
  planOnEdit,
  capabilities,
}: {
  planOnEdit: any;
  capabilities: Capabilitie[];
}) => {
  //States
  const [newDataForCapabilitie, setDataForCapabilitie] = useState(0);

  const saveCapabilitieForPlan = (capabilitieId: any, capabilitieName: any) => {
    if (planOnEdit) {
      const payload = {
        capabilitieId: parseInt(capabilitieId),
        planId: parseInt(planOnEdit.id),
        count: newDataForCapabilitie,
        name: capabilitieName,
      };

      connectCapabilitieWithPlan(payload)
        .then(() => toast.success("Capabilitie saved"))
        .catch((e) => toast.error(e.message));
    }
  };

 
  
  return (
    <div>
      {planOnEdit && (
        <div>
          <div className="w-full ">
            <div className="space-y-12">
              <div
                className={`grid   grid-cols-3 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12`}
              >
                <div className="lg:col-span-1 p-7">
                  <h2 className="text-subtitle">Capabilities</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {" "}
                    Set the capabilities for this plan
                  </p>
                </div>

                <div className="lg:col-span-2">
                  {capabilities
                    ?.filter((c: any) => c.group === planOnEdit.group)
                    .map((capabilitie: any, index: number) => (
                      <div key={`capabilitie-${index}`} className="mt-2">
                        <label
                          htmlFor={capabilitie.name}
                          className="block text-sm font-medium leading-6 text"
                        >
                          {capabilitie.name}
                          <span className="text-sky-500 ml-1 font-medium">
                            {" "}
                            Current
                          </span>
                          <span className="text-sky-500 ml-1 font-medium">
                            {" "}
                            {capabilitie.type === "LIMIT" ||
                            capabilitie.type === "AMOUNT"
                              ? planOnEdit.PlanCapabilities?.find(
                                  (c: { capabilitieId: number }) =>
                                    c.capabilitieId == capabilitie.id
                                )?.count ?? "Not set"
                              : ""}
                          </span>
                          <span className="text-sky-500 ml-1 font-medium">
                            {" "}
                            {capabilitie.type === "PERMISSION"
                              ? planOnEdit.PlanCapabilities?.find(
                                  (c: { capabilitieId: number }) =>
                                    c.capabilitieId == capabilitie.id
                                )?.count ?? null
                                ? "Yes"
                                : "No"
                              : ""}
                          </span>
                        </label>
                        <div className="flex space-x-3 rounded-md      sm:max-w-md">
                          {capabilitie.type === "LIMIT" ||
                          capabilitie.type === "AMOUNT" ? (
                            <TextInput
                              onValueChange={(value) =>
                                setDataForCapabilitie(parseInt(value))
                              }
                              min={0}
                              className="input-text"
                            />
                          ) : (
                            <Select
                              onValueChange={(value: string) =>
                                setDataForCapabilitie(parseInt(value))
                              }
                              className="input-text"
                            >
                              <SelectItem value="">-Change-</SelectItem>
                              <SelectItem value="1">Yes </SelectItem>
                              <SelectItem value="0">No</SelectItem>
                            </Select>
                          )}
                          <button
                            onClick={() =>
                              saveCapabilitieForPlan(
                                capabilitie.id,
                                capabilitie.name
                              )
                            }
                            className="btn-main"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpsertPlanCapabilities;
