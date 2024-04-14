import ForbiddenPage from "@/components/layouts/errors/ForbiddenPage";
import UserCard from "@/components/ui/commons/UserCard";
import { IInvoice } from "@/interfaces/billingModule";
import { getBadgeClass } from "@/utils/facades/frontendFacades/visualFacade";
import { getInvoiceTotal } from "@/utils/facades/serverFacades/paymentFacade";
import { CalendarDaysIcon, TicketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { Suspense } from "react";
import { getSuperAdminSetting } from "@/utils/facades/serverFacades/adminFacade";
import { parsePriceInLocalCurrency } from "@/utils/facades/frontendFacades/parseValuesFacade";
import { getPaymentMethods } from "@/actions/superAdmin/superAdminBillingModule/get-all-payment-methods";
import { InvoiceStatus } from "@prisma/client";
import PayInvoiceButton from "./PayInvoiceButton";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import SlideOver from "@/components/core/SlideOver";
import CouponCodeSectionForInvoices from "./CouponCodeSectionForInvoices";
import PrintInvoiceButton from "./PrintInvoiceButton";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";

const ViewInvoiceDetails = async ({ invoice }: { invoice: IInvoice }) => {
  if (!invoice) return <ForbiddenPage />;
  const businessName = await getSuperAdminSetting("BUSINESS_NAME");
  const businessAddress = await getSuperAdminSetting("BUSINESS_ADDRESS");
  const paymentMethods = await getPaymentMethods();
  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        <main id="invoicePrintDiv">
          <header className="relative isolate pt-16">
            <div
              className="absolute inset-0 -z-10 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                <div
                  className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                  style={{
                    clipPath:
                      "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                <div className="flex flex-col items-center  ">
                  <h1>
                    <div className="text-subtitle leading-6 text-gray-500  ">
                      Factura{" "}
                      <span className="text-gray-700"># {invoice.id}</span>
                    </div>
                  </h1>
                </div>
                <div className="flex items-center gap-x-4 sm:gap-x-6">
                  {invoice.invoicePdfUrl && (
                    <Link
                      href={invoice.invoicePdfUrl}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Descargar
                    </Link>
                  )}
                  <PrintInvoiceButton />
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Invoice summary */}
              <div className="lg:col-start-3 lg:row-end-1">
                <h2 className="sr-only">Summary</h2>
                <div className="rounded-lg bg-main shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      {invoice.Items && invoice.Items.length > 0 ? (
                        <>
                          <dt className="text-sm font-semibold leading-6 text-primary">
                            Total
                          </dt>
                          <dd className="mt-1 text-base font-semibold leading-6 text-primary">
                            {getInvoiceTotal(
                              invoice.Items,
                              invoice.Currency?.code,
                              invoice.coupons ?? []
                            )}
                          </dd>
                        </>
                      ) : null}

                      <SlideOver
                        button={{
                          name: "Aplicar cupón",
                          icon: (
                            <TicketIcon
                              className="h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                          ),
                        }}
                      >
                        <CouponCodeSectionForInvoices invoiceId={invoice.id} />
                      </SlideOver>
                    </div>

                    <div className="flex-none self-start px-6 pt-4">
                      <dt className="sr-only">Estado</dt>
                      <dd className={getBadgeClass(invoice.status)}>
                        {invoice.status}
                      </dd>
                    </div>

                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                      <dt className="flex-none">
                        <span className="sr-only">Client</span>

                        {invoice.user && <UserCard user={invoice.user} />}
                      </dt>
                    </div>

                    {invoice.paidAt && (
                      <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                          <span className="sr-only">Paid date</span>
                          <CalendarDaysIcon
                            className="h-6 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                          <time dateTime="2023-01-31">
                            Pagado el{" "}
                            {formatTimestampToDateString(
                              invoice.paidAt as Date
                            )}
                          </time>
                        </dd>
                      </div>
                    )}
                    {invoice.dueAt && !invoice.paidAt && (
                      <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                          <span className="sr-only">Due date</span>
                          <CalendarDaysIcon
                            className="h-6 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                          <time dateTime="2023-01-31">
                            Vence el{" "}
                            {formatTimestampToDateString(invoice.dueAt as Date)}
                          </time>
                        </dd>
                      </div>
                    )}
                    {/* <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <CreditCardIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      Paid with MasterCard
                    </dd>
                  </div> */}
                  </dl>
                  {/* <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-primary"
                  >
                    Download receipt <span aria-hidden="true">&rarr;</span>
                  </a>
                </div> */}
                  <br />
                </div>
              </div>
              <div className=" ">
                <h2 className="sr-only">Pagos </h2>
                <div className="rounded-lg bg-main shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      <dt className="text-sm font-semibold leading-6 text-primary">
                        Método de pago
                      </dt>
                    </div>

                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                      <dt className="flex-none">
                        {invoice.status === InvoiceStatus.PENDING && (
                          <PayInvoiceButton
                            invoice={invoice}
                            paymentMethods={paymentMethods}
                          />
                        )}
                      </dt>
                    </div>
                  </dl>

                  <br />
                </div>
              </div>

              {/* Invoice */}
              <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                <h2 className="text-base font-semibold leading-6 text-primary">
                  Factura
                </h2>
                <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                  <div className="sm:pr-4">
                    <dt className="inline text-gray-500">Creada el</dt>{" "}
                    <dd className="inline text-gray-700">
                      <time dateTime="2023-23-01">
                        {formatTimestampToDateString(invoice.createdAt as Date)}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:pl-4">
                    <dt className="inline text-gray-500">Vence el</dt>{" "}
                    <dd className="inline text-gray-700">
                      <time dateTime="2023-31-01">
                        {formatTimestampToDateString(invoice.dueAt as Date)}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                    <dt className="font-semibold text-primary">From</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-primary">
                        {businessName}
                      </span>
                      <br />
                      {businessAddress}
                    </dd>
                  </div>
                  <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                    <dt className="font-semibold text-primary">To</dt>
                    <dd className="mt-2 text-gray-500">
                      <span className="font-medium text-primary">
                        {invoice.user?.name}
                      </span>
                      <br />
                      {invoice.user?.email}
                    </dd>
                  </div>
                </dl>
                <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                  <colgroup>
                    <col className="w-full" />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className="border-b border-gray-200 text-primary">
                    <tr>
                      <th scope="col" className="px-0 py-3 font-semibold">
                        Item name
                      </th>
                      <th
                        scope="col"
                        className="py-3 pl-8 pr-0 text-right font-semibold"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.Items?.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="max-w-0 px-0 py-5 align-top">
                          <div className="truncate font-medium text-primary">
                            {item.name}
                          </div>
                          <div className="truncate text-gray-500">
                            {item.description}
                          </div>
                        </td>
                        <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                          {parsePriceInLocalCurrency(
                            item.price,
                            invoice.Currency?.code ?? "USD"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                      >
                        Subtotal
                      </th>
                      {invoice.Items && invoice.Items.length > 0 ? (
                        <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-primary">
                          {getInvoiceTotal(
                            invoice.Items,
                            invoice.Currency?.code ?? "USD",
                            invoice.coupons ?? []
                          )}
                        </td>
                      ) : null}
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="pt-4 font-normal text-gray-700 sm:hidden"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                      >
                        Tax
                      </th>
                      <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-primary"></td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="pt-4 font-semibold text-primary sm:hidden"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        colSpan={3}
                        className="hidden pt-4 text-right font-semibold text-primary sm:table-cell"
                      >
                        Total
                      </th>
                      {invoice.Items && invoice.Items.length > 0 ? (
                        <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-primary">
                          {getInvoiceTotal(
                            invoice.Items,
                            invoice.Currency?.code ?? "USD",
                            invoice.coupons ?? []
                          )}
                        </td>
                      ) : null}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
    </div>
  );
};

export default ViewInvoiceDetails;
