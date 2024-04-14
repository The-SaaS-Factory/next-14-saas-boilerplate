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

import Link from "next/link";
import { ICoupon } from "@/interfaces/billingModule";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { Suspense } from "react";
import { getAllCoupons } from "@/actions/superAdmin/superAdminBillingModule/coupons/get-all-coupons";
import ConnectCouponWithStripe from "./ConnectCouponWithStripe";
import { getAllCurrencies } from "@/actions/superAdmin/superAdminBillingModule/get-all-currencies";
import {
  getStatusName,
  getBadgeClass,
} from "@/utils/facades/frontendFacades/visualFacade";

const CouponsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const search = query || "";
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const currencies = await getAllCurrencies();
  const { data, totalPages, totalCount } = await getAllCoupons({
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
            <NotFound message="No coupons found" />
          </div>
        ) : (
          <div className="flex flex-col">
            <Table className="mt-6">
              <TableHead>
                <TableRow className="">
                  <TableHeaderCell className="text-center">
                    Nombre / Código
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    User
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Estado
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Stripe Conection
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Cantidad de descuento fija
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    % de descuento
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Duración en meses / Usos máximos
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Usos
                  </TableHeaderCell>
                  <TableHeaderCell className="text-center">
                    Actions
                  </TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item: ICoupon, index: number) => (
                  <TableRow key={`userS-${item.id + index}`}>
                    <TableCell className="text-center items-center">
                      <span>
                        {item.name} /
                        <span className="text-primary">{item.code}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-center items-center">
                      <span>
                        {item.user?.name || "Uso global"} - ({item.user?.id})
                      </span>
                    </TableCell>
                    <TableCell className="text-center items-center">
                      <span className={getBadgeClass(item.status)}>
                        {getStatusName(item.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center items-center">
                      <ConnectCouponWithStripe
                        coupon={item}
                        currencies={currencies}
                        path={`/admin/billing/coupons`}
                        settings={item.settings}
                      />
                    </TableCell>
                    <TableCell className="text-center text">
                      <Badge color={"sky"}>{item.amountOff} off</Badge>
                    </TableCell>
                    <TableCell className="text-center text">
                      <Badge color={"sky"}>{item.percentOff} % off</Badge>
                    </TableCell>
                    <TableCell className="text-center text">
                      <Badge color={"blue"}>
                        {item.durationInMonths} / {item.maxRedemptions}{" "}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text">
                      <Badge color={"blue"}>
                        <div>
                          {item.invoices?.length} / {item.maxRedemptions}
                          <hr />
                        </div>
                      </Badge>
                      <ul>
                        <span>Facturas: </span>
                        {item.invoices?.map((invoice) => (
                          <Link
                            key={`invoice-${invoice.id}`}
                            href={`/admin/billing/invoices/${invoice.id}`}
                          >
                            <li className="flex space-x-1 gap-1">
                              {invoice.id}
                              <EyeIcon className="w-5 h-5  " />
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell className="w-14   ">
                      <Link
                        href={`/admin/billing/coupons/edit/${item.id}`}
                        className="btn-icon  "
                      >
                        <PencilSquareIcon className="w-5 h-5  " />
                        <span>Editar</span>
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

export default CouponsList;
