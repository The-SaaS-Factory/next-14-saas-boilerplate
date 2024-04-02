import React, { Suspense } from "react";
import { LifebuoyIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils/facades/serverFacades/strFacade";
import PageName from "@/components/ui/commons/PageName";
import { Card, Flex, Metric, Text } from "@tremor/react";
import Link from "next/link";
import { getUserInvoicesPendingCount } from "@/actions/superAdmin/superAdminBillingModule/admin/get-user-invoices";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { getSupportTicketsActivesCount } from "@/actions/global/supportModule/admin/get-user-support-tickets";
import AffiliateHandler from "@/components/core/AffiliateHandler";
import { getUserDB } from "@/actions/admin/userModule/get-user-DB";
import { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Home",
};
const SuperAdminDashboardPage = async () => {
  const actions = [
    {
      title: "Has un nuevo pedido",
      href: "/home/services/buy-service",
      icon: ShoppingBagIcon,
      iconForeground: "text-teal-700",
      description: "Los mejores precios y calidad en el mercado",
      iconBackground: "bg-teal-50",
    },
    {
      title: "Habla con nuestro soporte",
      href: "/home/support",
      icon: LifebuoyIcon,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      description: "Estamos para ayudarte",
    },
  ];

  const invoicesCount = await getUserInvoicesPendingCount();
  const supportTicketsCounts = await getSupportTicketsActivesCount();
  const user = await getUserDB();
  
  

  return (
    <div>
      <PageName name={"Escritorio  "} />
      <Suspense fallback={<PageLoader />}>
        <Card className=" my-7">
          <Flex>
            <div>
              <Link href={"/home/services"}>
                <Text color="sky">Example activos</Text>
              </Link>
              <Metric> 3 </Metric>{" "}
            </div>
            <div>
              <Link href={"/home/invoices"}>
                <Text color="sky">Facturas pendientes de pago</Text>
              </Link>
              <Metric>{invoicesCount}</Metric>
            </div>
            <div>
              <Link href={"/home/support"}>
                <Text color="sky">Tickets activos</Text>
              </Link>
              <Metric>{supportTicketsCounts}</Metric>
            </div>
          </Flex>
        </Card>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-main shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={classNames(
                actionIdx === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                actionIdx === actions.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-main p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              )}
            >
              <div>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    "inline-flex rounded-lg p-3 ring-4 ring-white"
                  )}
                >
                  <action.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-primary">
                  <a href={action.href} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-primary">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </Suspense>

      <AffiliateHandler aff={null} currentUser={user} />
    </div>
  );
};

export default SuperAdminDashboardPage;
