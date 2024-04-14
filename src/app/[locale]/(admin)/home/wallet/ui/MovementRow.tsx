"use client";
import { AdminMovementsAmounts } from "@prisma/client";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { parsePriceInLocalCurrency } from "@/utils/facades/frontendFacades/parseValuesFacade";
import { getBadgeClass } from "@/utils/facades/frontendFacades/visualFacade";
import { formatTimestampToDateString } from "@/utils/facades/serverFacades/strFacade";

export const MovementRow = (
  movement: AdminMovementsAmounts,
  currencyCode: string
) => {

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          {movement.type === "CREDIT" ? (
            <ArrowUpCircleIcon
              className="h-6 w-6 text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ArrowDownCircleIcon
              className="h-6 w-6 text-red-500"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span>{movement.details}</span>
          <span>
            <span className="text-primary">
              {formatTimestampToDateString(movement.createdAt)}
            </span>{" "}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <div className="   flex space-x-3 items-center ">
            {movement.status !== "COMPLETED" && (
                <span
                className={getBadgeClass(movement.status)}
                >
                    {movement.status}
                </span>
            )}
          <span className="text-subtitle">
            {movement.type === "CREDIT" ? "+" : "-"}
            {parsePriceInLocalCurrency(movement.amount, currencyCode)}
          </span>
        </div>
       
      </div>
    </li>
  );
};
