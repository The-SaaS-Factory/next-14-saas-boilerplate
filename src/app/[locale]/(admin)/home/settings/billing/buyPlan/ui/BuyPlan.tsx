"use client";
import { RadioGroup } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { classNames } from "@/utils/facades/serverFacades/strFacade";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { AdminCurrencies, PaymentMethod } from "@prisma/client";
import { Select, SelectItem } from "@tremor/react";
import {
  parsePriceInLocalCurrency,
  traslateData,
} from "@/utils/facades/frontendFacades/parseValuesFacade";
import { IPricing, PlanType } from "@/interfaces/billingModule";
import { constants } from "@/lib/constants";
import usePaymentMethods from "@/app/hooks/usePaymentMethods";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { activateTrialPlan } from "@/actions/superAdmin/superAdminBillingModule/activate-trial-plan";
export type SettingType = {
  settingName: string;
  settingValue: string;
};

type PageParams = {
  payments: any;
  plans: any;
  currencies: AdminCurrencies[];
  paymentMethods: PaymentMethod[];
};

const PlansComponent = ({ plans, currencies, paymentMethods }: PageParams) => {
  //States
  const [currencySelected, setCurrencySelected] = useState<any>(
    currencies.find((currency: AdminCurrencies) => currency.main)
  );

  const t = useTranslations("AdminLayout.pages.plans");
  const [selectMethodModal, setSelectMethodModal] = useState(false);
  const handleSetOpenModal = () => setSelectMethodModal(!selectMethodModal);
  const [planSelected, setPlanSelected] = useState<any>(null);
  const [pricing, setPricing] = useState<any>({
    frequencies: [
      { value: "month", label: t("monthly"), priceSuffix: t("/month") },
      { value: "year", label: t("annually"), priceSuffix: t("/year") },
    ],
  });
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);
  const locale = useLocale();

  useEffect(() => {
    const allFrequencies: string[] = [];

    plans?.map((plan: PlanType) => {
      plan.pricing?.map((pricing: IPricing) => {
        if (plan.status === "ACTIVE") {
          if (!allFrequencies.includes(pricing.frequency)) {
            allFrequencies.push(pricing.frequency);
          }
        }
      });
    });

    if (allFrequencies.length > 0) {
      const formattedTypes: any = allFrequencies.map((typeName) => ({
        value: typeName,
        label: typeName.charAt(0).toUpperCase() + typeName.slice(1),
        priceSuffix: `/${typeName}`,
      }));

      setPricing({
        frequencies: [...formattedTypes],
      });

      setFrequency(formattedTypes[0]);
    }
  }, [plans]);

  const parseFrequencyName = (name: string) => {
    if (name === "Year") {
      return "Annually";
    }
    return name;
  };

  const handleConvertCurrency = (price: number) => {
    return price * currencySelected.rate;
  };

  const handleActivateTrialPlan = async (planId: number, pricingId: number) => {
    await activateTrialPlan({
      planId,
      pricingId,
      currencyId: currencySelected.id,
    })
      .then(() => {
        toast.success(t("trialPlanActivated"));
        window.location.reload();
        window.location.href = "/home/settings/billing/planActive";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <SelectPaymentMethod
        open={selectMethodModal}
        setOpen={handleSetOpenModal}
        pricingSelected={planSelected}
        paymentMethods={paymentMethods}
        currencySelected={currencySelected}
      />
      <div className="bg-transparent">
        <div className="flex mx-auto justify-center py-7">
          <Select
            className=" w-full mx-auto max-w-7  "
            defaultValue={currencySelected?.code ?? "usd"}
            onValueChange={(value) => {
              setCurrencySelected(
                currencies.find(
                  (currency: AdminCurrencies) => currency.code === value
                )
              );
            }}
            icon={CurrencyDollarIcon}
          >
            {currencies?.map((currency: AdminCurrencies) => (
              <SelectItem key={`currency-${currency.id}`} value={currency.code}>
                {currency.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <section id="Membership">
          <div className="mx-auto flex flex-col mt-3 max-w-7xl px-6   lg:px-8">
            <div className="mx-auto max-w-4xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                {t("pricing")}
              </h2>
              <p className="mt-2 mega-title">
                {t("plansOfFidelity")} {constants.appName}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
              {t("plansOfFidelityDescription")}
            </p>

            <div className="flex max-lg my-14 px-7  justify-between">
              <div></div>
              <div className="flex w-full  mx-auto max-w-lg   ">
                {pricing.frequencies.length > 1 && (
                  <div className="  w-full mx-auto   items-center">
                    <div className=" ">
                      <RadioGroup
                        value={frequency}
                        onChange={setFrequency}
                        className={`grid grid-cols-${pricing.frequencies.length} gap-x-1 rounded-full
                         p-1 text-center text-xs font-semibold leading-5 ring-1
                          ring-inset ring-gray-200`}
                      >
                        <RadioGroup.Label className="sr-only">
                          {t("paymentFrequency")}
                        </RadioGroup.Label>
                        {pricing.frequencies.map((option: any) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={() =>
                              classNames(
                                frequency.value === option.value
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-500",
                                "cursor-pointer rounded-full px-2.5 py-1"
                              )
                            }
                          >
                            <span>{parseFrequencyName(option.label)}</span>
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full  ">
              <div className="grid grid-cols-1 mx-auto p-3 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans?.map((plan: PlanType) => {
                  return plan.pricing
                    ?.filter(
                      (pricing: IPricing) =>
                        pricing.frequency === frequency.value &&
                        plan.status === "ACTIVE"
                    )
                    .map((tier: any) => (
                      <div key={plan.id} className="col-span-1">
                        <div
                          key={tier.id}
                          className="border border-gray-200 rounded-2xl p-7"
                        >
                          <h2
                            id={tier.id}
                            className="text-lg font-semibold leading-8 title"
                          >
                            {traslateData(plan.name, locale)}
                          </h2>
                          <div
                            className="mt-4 magic-link  text-sm max-w-sm leading-6 subtitle"
                            dangerouslySetInnerHTML={{
                              __html:
                                traslateData(plan.description, locale) ?? "",
                            }}
                          ></div>
                          <p className="mt-6 flex items-baseline gap-x-1">
                            <span className="text-4xl font-bold tracking-tight mega-title">
                              {parsePriceInLocalCurrency(
                                handleConvertCurrency(tier.price),
                                currencySelected.code
                              )}
                            </span>
                            <span className="text-sm font-semibold leading-6 text-gray-600">
                              {frequency.priceSuffix}
                            </span>
                          </p>
                          <ul
                            role="list"
                            className="divide-y my-3 space-y-3 divide-gray-100"
                          >
                            {plan.PlanCapabilities?.map(
                              (capa: any, index: number) => {
                                return (
                                  <li
                                    key={`capa-${index}`}
                                    className="items-center flex space-x-3 p-1 text"
                                  >
                                    {capa.capabilitie?.type === "PERMISSION" ? (
                                      <div className="flex space-x-3 items-center">
                                        {capa.count === 1 ? (
                                          <button className="  mr-2">
                                            {" "}
                                            <CheckBadgeIcon className="text-green-500 h-5 w-5" />{" "}
                                          </button>
                                        ) : (
                                          <button className=" mr-2 ">
                                            {" "}
                                            <XMarkIcon
                                              className="text-red-500 h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        )}{" "}
                                        <div className="flex flex-col">
                                          <span>
                                            {traslateData(
                                              capa.capabilitie.title,
                                              locale
                                            )}
                                          </span>
                                          <p className="text-sm text-gray-500">
                                            {traslateData(
                                              capa.capabilitie.description,
                                              locale
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        - {capa.capabilitie.title}{" "}
                                        {capa.type === "LIMIT" && "/ month"}
                                      </div>
                                    )}{" "}
                                  </li>
                                );
                              }
                            )}
                          </ul>

                          <div className="flex space-x-3">
                            {plan.freeTrialDays && plan.freeTrialDays > 0 && (
                              <button
                                onClick={() => {
                                  handleActivateTrialPlan(plan.id, tier.id);
                                }}
                                className={classNames(
                                  tier.mostPopular
                                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                                  "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                )}
                              >
                                {t("activateTrialPlan", {
                                  days: plan.freeTrialDays,
                                })}{" "}
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setPlanSelected(tier);
                                setSelectMethodModal(true);
                              }}
                              className={classNames(
                                tier.mostPopular
                                  ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                                  : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                                "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              )}
                            >
                              {t("buyPlan")}{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    ));
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export function SelectPaymentMethod({
  open,
  setOpen,
  currencySelected,
  paymentMethods,
  pricingSelected,
}: {
  open: boolean;
  setOpen: () => void;
  currencySelected: any;
  paymentMethods: any;
  pricingSelected: any;
}) {
  const { user } = useUser();
  const cancelButtonRef = useRef(null);

  const {
    paymentMethosAvailables,
    payWithStripe,
    payWithQvapay,
    payWithCUP,
    payWithWallet,
  } = usePaymentMethods(currencySelected.id, paymentMethods);

  const handleSelectPaymentMethod = (paymentMethod: any) => {
    if (paymentMethod.name === "Stripe") {
      payWithStripe("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "CUP en Cuba") {
      payWithCUP("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "QvaPay") {
      payWithQvapay("PLAN", pricingSelected.id);
    }
    if (paymentMethod.name === "Wallet") {
      payWithWallet("PLAN", pricingSelected.id);
    }
  };

  const t = useTranslations("AdminLayout.pages.plans");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform   overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                style={{ width: "100%" }}
              >
                {user ? (
                  <>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text"
                        >
                          {t("selectPaymentMethod")} {" "}
                          {currencySelected.name}
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="flex flex-col mt-14 space-y-3">
                      <div className="flex flex-col space-y-3 my-7">
                        {paymentMethosAvailables.map((paymentMethod) => {
                          return (
                            <div
                              className="flex space-x-3 items-center"
                              key={paymentMethod.id}
                            >
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
                                onClick={() => {
                                  handleSelectPaymentMethod(paymentMethod);
                                }}
                              >
                                {t("payWith")} {paymentMethod.name}
                                {paymentMethod.image && (
                                  <Image
                                    width={100}
                                    height={30}
                                    src={paymentMethod.image}
                                    className=" ml-3 h-5  w-auto"
                                    alt="Stripe"
                                  />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <br />
                      <button
                        type="button"
                        className="mt-7 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen()}
                        ref={cancelButtonRef}
                      >
                        {t("cancel")}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col  space-y-7">
                    <h2 className="title text-center pt-7">{t("needLogin")}</h2>
                    <Link href={"/home"} className="btn-main mx-auto">
                      {t("login")}
                    </Link>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default PlansComponent;
