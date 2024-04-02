"use client";

import React, { ReactNode, useState } from "react";
const TabsClientSide = ({
  tabs,
}: {
  tabs: {
    key: string;
    label: string;
    icon: any | null;
    children: ReactNode;
  }[];
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-3">
        {tabs.map((tab) => (
          <div key={tab.key} className=" ">
            <button
              onClick={() => {
                setSelectedTab(tab.key);
              }}
              className={`${
                selectedTab === tab.key ? "btn-main-selected" : "btn-main"
              } flex space-x-1`}
            >
              {tab.icon &&
                React.cloneElement(tab.icon, {
                  className: "w-5 h-5",
                })}
              <span>{tab.label}</span>
            </button>
          </div>
        ))}
      </div>
      <hr className="my-1" />
      <div className="flex w-full">
        {tabs.find((tab) => tab.key === selectedTab)?.children}
      </div>
    </div>
  );
};

export default TabsClientSide;
