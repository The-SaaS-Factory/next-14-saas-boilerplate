"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import completeOnboarding from "@/actions/global/onboarding/complete-onboarding";
import { toast } from "sonner";
import ReactConfetti from "react-confetti";

export default function Example() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [open, setOpen] = useState(true);
  const handleCompleteOnboarding = async () => {
    await completeOnboarding("some data")
      .then((r) => {
        console.log(r);
        if (r === "ok") {
          setIsCompleted(true);
          toast.success("Onboarding completed");
          setTimeout(() => {
            window.location.href = "/home";
          }, 5000);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error completing onboarding");
      });
  };

  return (
    <Transition.Root show={open} as={Fragment} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto p-7 max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <div className="flex flex-col text-center">
                <div className="mx-auto my-14">
                  <h1 className="text-title">Welcome to the admin panel</h1>
                  <p className="mt-32">Put your form here</p>
                </div>
                {isCompleted && <ReactConfetti width={1000} height={1000} />}
                {!isCompleted ? (
                  <button
                    onClick={handleCompleteOnboarding}
                    className="btn-main w-[50%] mx-auto"
                  >
                    Complete onboarding
                  </button>
                ) : (
                  <p className="animate-pulse">Redirecting ...</p>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
