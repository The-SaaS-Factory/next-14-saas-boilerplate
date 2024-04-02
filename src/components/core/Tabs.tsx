"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Tabs = ({
  tabs,
}: {
  tabs: {
    path: string;
    label: string;
    icon: any | null;
  }[];
}) => {
  const pathname = usePathname();


  return (
    <div>
      <div className="flex w-full border-b-2 py-1 border-gray-200 ">
        <div className="  flex space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab.path}
              className="flex space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-xl"
            >
              {tab.icon &&
                React.createElement(tab.icon, {
                  className: pathname.includes(tab.path)
                    ? "w-5 h-5 text-primary active-tab"
                    : "text-primary w-5 h-5",
                  "aria-hidden": "true",
                })}
              <Link
                href={tab.path}
                className={
                  pathname.includes(tab.path) ? "active-tab" : "text-primary"
                }
              >
                {tab.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
