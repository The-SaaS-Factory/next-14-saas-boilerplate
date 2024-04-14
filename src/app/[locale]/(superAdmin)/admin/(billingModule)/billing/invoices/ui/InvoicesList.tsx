import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import { getAllInvoices } from "@/actions/superAdmin/superAdminBillingModule/get-all-invoices";
import {
  getBadgeClass,
  getStatusName,
} from "@/utils/facades/frontendFacades/visualFacade";
import Link from "next/link";
import { getInvoiceTotal } from "@/utils/facades/serverFacades/paymentFacade";
import { IInvoice } from "@/interfaces/billingModule";
import { EyeIcon } from "@heroicons/react/24/outline";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { Suspense } from "react";
import DeleteModel from "@/components/core/DeleteModel";
import { deleteInvoice } from "@/actions/superAdmin/superAdminBillingModule/delete-invoice";

const InvoicesList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages, totalCount } = await getAllInvoices({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <NotFound message="No invoices found" />
          </div>
        ) : (
          <div className="flex flex-col">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-left">Owner</TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Amount
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Type
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Gateway
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    PDF Url
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Date
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: IInvoice, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="text-left items-center">
                      <span>{item.user?.name}</span>
                    </TableCell>
                    <TableCell className="text-center text">
                      {item.Items && item.Items.length > 0 ? (
                        <Badge color={"green"}>
                          <span className="font-medium">
                            {getInvoiceTotal(
                              item.Items,
                              item.Currency?.code,
                              item.coupons ?? []
                            )}
                          </span>
                        </Badge>
                      ) : (
                        <Badge color={"green"}>-</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-left items-center">
                      <span>{item.type}</span>
                    </TableCell>
                    <TableCell className="text-center text">
                      <span className={`${getBadgeClass(item.status)}`}>
                        {getStatusName(item.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text">
                      <Badge color={"sky"}>{item.gateway}</Badge>
                    </TableCell>
                    <TableCell className="text-center text">
                      <Link
                        href={item.invoicePdfUrl || ""}
                        target="_blank"
                        className="text-primary"
                      >
                        PDF Link
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text">
                      <span>{formatTimestampToDateString(item.createdAt)}</span>
                    </TableCell>
                    <TableCell className="w-14 flex space-x-3 ">
                      <DeleteModel
                        modelId={item.id}
                        deleteAction={deleteInvoice}
                      />
                      <Link
                        href={`/admin/billing/invoices/${item.id}`}
                        className="btn-icon  "
                      >
                        <EyeIcon className="w-5 h-5  " />
                        <span>View</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex mt-7 justify-between">
             
              <Pagination
                offset={offset}
                dataLength={data.length}
                totalCount={totalCount}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default InvoicesList;
