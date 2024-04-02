import React, { ReactNode } from "react";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import Link from "next/link";
import ButtonFunction from "../componenets/ButtonFunction";

type Btn = {
  name: string;
  href?: string;
  icon?: React.ElementType | null;
  fn?: () => void;
};

type BreadcrumbItem = {
  name: string;
  href: string;
};

type PageNameProps = {
  name: string;
  btn1?: Btn;
  btn2?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  isSubPage?: boolean;
};

const PageName = ({
  name,
  btn1,
  btn2,
  breadcrumbs,
  isSubPage,
}: PageNameProps) => {
  return (
    <>
      <div className="-mt-3">
        <div className="flex justify-between">
          <div className="flex flex-col my-2 space-y-1">
            <nav className="-ml-3  sm:flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-3">
                {breadcrumbs?.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      {index > 0 && (
                        <ChevronRightIcon
                          className="h-5 w-5 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                      )}
                      <Link
                        href={item.href}
                        className="ml-4 lg:hidden text-sm truncate text-primary"
                      >
                        {item.name.length > 14
                          ? item.name.substring(0, 14) + "..."
                          : item.name}
                      </Link>
                      <Link
                        href={item.href}
                        className="ml-4 hidden lg:flex text-sm truncate text-primary"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="flex">
              <h1
                className={`${
                  isSubPage ? "text-subtitle py-4" : "text-title"
                }  font-semibold `}
              >
                {name}
              </h1>
            </div>
          </div>
          <div className="flex space-x-3 items-center">
            {btn1 &&
              (btn1.fn ? (
                <ButtonFunction
                  btn={{
                    name: btn1.name,
                    icon: btn1.icon,
                    fn: btn1.fn,
                  }}
                />
              ) : (
                <Link href={btn1.href as string} className="btn-icon ">
                  {" "}
                  {btn1.icon &&
                    React.createElement(btn1.icon, {
                      className: "h-5 w-5 text-primary",
                      "aria-hidden": "true",
                    })}
                  <span>{btn1.name}</span>
                </Link>
              ))}

            {btn2 && btn2}
          </div>
        </div>
        <hr className="mb-1" />
      </div>
    </>
  );
};

export default PageName;
