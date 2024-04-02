// "use client";
// import { Dialog, Transition } from "@headlessui/react";
// import Image from "next/image";
// import { Fragment, useRef } from "react";

// export default function NewDeposit({
//   open,
//   setOpen,
//   currencyCode,
//   paymentMethosAvailables,
// }: {
//   open: boolean;
//   setOpen: any;
//   currencyCode: string;
//   paymentMethosAvailables: any[];
// }) {
//   const cancelButtonRef = useRef(null);

//   const handleSelectPaymentMethod = (paymentMethod: any) => {
//     // if(paymentMethod.name === "Stripe") {
//     console.log(paymentMethod);

//     await createPlanInvoice({
//       payload: {
//         planId: planSelected.planId,
//         currencyId: currencySelected.id,
//         priceId: planSelected.id,
//       },
//     })
//       .then((data) => {
//         invoiceId = data.id;
//       })
//       .catch((error) => {
//         toast.error(error.message);
//         return null;
//       });

//     if (!invoiceId) {
//       toast.error("Error creating invoice");
//       setLoading(false);
//       return;
//     }

//     await createCheckoutSession(invoiceId, "PLAN")
//       .then((data) => {
//         window.location.href = data.url as string;
//       })
//       .catch((error) => {
//         toast.error(error.message);
//         return null;
//       });

//     setLoading(false);
//     // }
//   };

//   return (
//     <div>
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-50"
//           initialFocus={cancelButtonRef}
//           onClose={setOpen}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <Dialog.Panel
//                   className="relative transform   overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
//                   style={{ width: "100%" }}
//                 >
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg leading-6 font-medium text-primary"
//                   >
//                     Deposit {currencyCode}
//                   </Dialog.Title>

//                   <div className="flex flex-col space-y-3 my-7">
//                     {paymentMethosAvailables.map((paymentMethod) => {
//                       return (
//                         <div
//                           className="flex space-x-3 items-center"
//                           key={paymentMethod.id}
//                         >
//                           <button
//                             type="button"
//                             className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
//                             onClick={() => {
//                               handleSelectPaymentMethod(paymentMethod);
//                             }}
//                           >
//                             Pay with {paymentMethod.name}
//                             {paymentMethod.image && (
//                               <Image
//                                 width={100}
//                                 height={30}
//                                 src={paymentMethod.image}
//                                 className=" ml-3 h-5  w-auto"
//                                 alt="Stripe"
//                               />
//                             )}
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </div>
//   );
// }
