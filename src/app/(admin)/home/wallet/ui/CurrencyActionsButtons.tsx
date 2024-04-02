// "use client";

// import {
//   ArrowUpCircleIcon,
// } from "@heroicons/react/24/outline";
// import { PaymentMethod } from "@prisma/client";
// import usePaymentMethods from "@/app/hooks/usePaymentMethods";
// import { useState } from "react";

// export const CurrencyActionsButtons = ({
//   currencyId,
//   paymentMethods,
// }: {
//   currencyCode: string;
//   currencyId: number;
//   paymentMethods: PaymentMethod[];
// }) => {
//   const { hasPaymentMethods, paymentMethosAvailables } = usePaymentMethods(
//     currencyId,
//     paymentMethods
//   );
//   return (
//     <div className="flex   space-x-3">
//       {/* <button className="btn-icon">
//         <ArrowDownCircleIcon
//           className="text-primary h-5 w-5"
//           aria-hidden="true"
//         />{" "}
//         <span>Retirar</span>
//       </button> */}
//       {hasPaymentMethods && (
//         <>
//           <button onClick={() => setOpenDeposit(true)} className="btn-icon">
//             <ArrowUpCircleIcon
//               className="text-primary h-5 w-5"
//               aria-hidden="true"
//             />{" "}
//             <span>Depositar</span>
//           </button>
// {/* 
//           <NewDeposit
//             open={openDeposit}
//             setOpen={setOpenDeposit}
//             currencyCode={currencyCode}
//             paymentMethosAvailables={paymentMethosAvailables}
//           /> */}
//         </>
//       )}
//     </div>
//   );
// };
