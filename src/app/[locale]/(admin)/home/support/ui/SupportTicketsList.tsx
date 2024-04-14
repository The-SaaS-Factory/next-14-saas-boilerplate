import { getUserSupportTickets } from "@/actions/global/supportModule/admin/get-user-support-tickets";
import NotFound from "@/components/layouts/errors/NotFound";
import Pagination from "@/components/ui/commons/Pagination";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { ISupportTicket } from "@/interfaces/supportModule";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense } from "react";

// eslint-disable-next-line no-undef
export const showTicketStatus = (status: string): JSX.Element => {
  if (status === "OPEN") {
    return <span className={"badge-pending"}>Open</span>;
  } else if (status === "AWAITING_RESPONSE") {
    return <span className={"badge-green"}>Waiting for response</span>;
  } else if (status === "UNDER_REVIEW") {
    return <span className={"badge-orange"}>Under Review</span>;
  } else if (status === "CANCELED") {
    return <span className={"badge-red"}>Canceled</span>;
  } else if (status === "CLOSED") {
    return <span className={"badge-sky"}>Closed</span>;
  } else if (status === "REOPENED") {
    return <span className={"badge-paid"}>Re Open</span>;
  } else {
    return <span className={"badge-unknown"}>Unknown</span>;
  }
};

const SupportTicketsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;
  const t = useTranslations("AdminLayout.pages.support");

  const { data, totalPages, totalCount } = await getUserSupportTickets({
    args: {
      search,
      limit,
      offset,
    },
  });

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <TableLoaderSkeleton count={10} />
          </div>
        }
      >
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <NotFound message={t("notTicketFound")} />
          </div>
        ) : (
          <div className="flex flex-col">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-left">
                    {t("subject")}
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    {t("departament")}
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    {t("status")}
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    {t("date")}
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: ISupportTicket, index: number) => (
                  <TableRow key={`userInvoice-${index}`}>
                    <TableCell className="text-left text">
                      {item.subject} - (ID-{item.id})
                    </TableCell>
                    <TableCell className="text-left space-x-3  ">
                      <span className="uppercase">{item.departament}</span>
                    </TableCell>
                    <TableCell className="text-center text">
                      {showTicketStatus(item.status)}
                    </TableCell>
                    <TableCell className="text-center text">
                      {formatTimestampToDateString(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-center text">
                      <Link
                        href={`/home/support/ticket/${item.id}`}
                        className="btn-main"
                      >
                        {t("view")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex mt-7 justify-between">
              <Pagination
                totalPages={totalPages}
                totalCount={totalCount}
                offset={offset}
                dataLength={data.length}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default SupportTicketsList;
