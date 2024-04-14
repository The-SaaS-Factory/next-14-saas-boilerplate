"use client";
import LocaleSwitcher from "@/components/core/LocaleSwitcher";
import { constants } from "@/lib/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Link 1 ", href: "/#" },
  { name: "Link 2 ", href: "/#" },
  { name: "Link 3  ", href: "/#" },
];

export const HeaderLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center z-40 justify-between lg:justify-around max-w-7xl mx-auto p-6  "
        aria-label="Global"
      >
        <div className="flex  ">
          <Link href="/" className=" ">
            <Image
              className="h-16 -mt-5 w-auto"
              width={200}
              height={160}
              src={constants.logoUrl}
              alt="The SaaS Boilerplate"
            />
          </Link>
        </div>
        <div className="flex -mt-3 items-center">
          <div className="flex ml-3 lg:ml-0 order-2 lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="lg:ml-32 flex  space-x-7 items-center">
            <div className=" hidden lg:flex">
              <LocaleSwitcher />
            </div>
            <SignedIn>
              <div className="ml-32">
                <Link href="/home">
                  {user?.imageUrl && (
                    <Image
                      src={user?.imageUrl}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/home" className="btn-icon">
                <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">QvaHost Company</span>
            </a>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6  ">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <hr className="bg-gray-500/25 h-1  " />
              <div className="py-6  flex flex-col">
                <Link
                  href="/home"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Login / Register
                </Link>

                <hr className="bg-gray-500/25 h-1 my-7" />
                <div className="   lg:hidden">
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
