"use client";
import { constants } from "@/lib/constants";
import { useEffect } from "react";
import ReactConfetti from "react-confetti";

export default function Welcome() {

  useEffect(() => {
    setTimeout(() => {
      window.location.replace("/home");
    }, 5000);
  }, []);

  return (
    <div className="bg-black  isolate pt-14">
      <ReactConfetti
        width={1000}
        height={1000}
      />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
         bg-gradient-to-tr from-[#000000] to-[#070707] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="py-24 sm:py-32  ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight
                         sm:text-6xl bg-clip-text
            text-transparent bg-gradient-to-r
             from-pink-50 via-greeen-200 to-sky-300"
            >
              Bienvenido a {constants.appName}!
            </h1>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
