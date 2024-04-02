import Image from "next/image";
import BtnBuyService from "./BtnBuyService";

export default function CTAMain() {
  return (
    <>
      <div id="contact" className="   max-w-7xl mx-auto pb-32">
        <div className="relative isolate">
          <div className="mx-auto   max-w-7xl routed-lg">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white  px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <Image
                width={1318}
                height={752}
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                src="/assets/img/hosting.jpg"
                alt=""
              />
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime velit, explicabo facilis rerum quibusdam nulla quos libero. 
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem temporibus autem, veniam in odit neque illo totam doloremque laborum dolor eveniet aliquid inventore? Quasi cupiditate molestias perferendis velit vitae.
                </p>
               
                <div className="mt-10 flex space-x-3">
                  <BtnBuyService />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
