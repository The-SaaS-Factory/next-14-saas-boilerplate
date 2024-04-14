"use client";

import { ChangeEvent, ReactNode, useTransition } from "react";

import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { Pathnames } from "next-intl/navigation";
import { locales } from "@/i18n";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
export const localePrefix = undefined;
export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    de: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <label
      className={`relative text-gray-400  ${
        isPending && "transition-opacity [&:disabled]:opacity-30"
      } `}
    >
      <p className="sr-only">{label}</p>
      <button className=" border-[0.5] border-gray-50 rounded-lg px-1 flex items-center">
        <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        <select
            className="text-gray-300  appearance-none active:border-0 bg-transparent border-0 "
            defaultValue={defaultValue}
            disabled={isPending}
            onChange={onSelectChange}
        >
            {children}
        </select>
      </button>
    </label>
  );
}
