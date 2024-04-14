import React from "react";
import BtnBuyService from "./BtnBuyService";
import { useTranslations } from "next-intl";

const HeroLanding = () => {
  const t = useTranslations('Index');
  return (
    <>
      <div className="  isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
             bg-gradient-to-tr from-[#8948df] to-[#11c6dd] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="py-24 sm:py-40  ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1
                className="text-4xl font-bold tracking-tight
                             sm:text-6xl bg-clip-text
                text-transparent bg-gradient-to-r
                 from-pink-50 via-greeen-200 to-sky-300"
              >
                {t("title")}
              </h1>
              <p className="mt-6 py-3 text-lg leading-8 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
                officiis fugit odio totam rem, expedita asperiores odit, id
                ipsum debitis consequuntur culpa amet quae voluptates vitae!
                Quisquam, iure quos! Sequi.
              </p>

              <div className="  mt-10 flex items-center justify-center gap-x-6">
                <BtnBuyService />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroLanding;
