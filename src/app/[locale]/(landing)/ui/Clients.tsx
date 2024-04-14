"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { sliderSettings } from "@/lib/constants";



const clients = [
  {
    href: "https://hicseo.com/",
    name: "HICSEO",
    logo: "/assets/img/clients/hic.png",
  },
  {
    href: "https://cluzstudio.com",
    name: "CluzStudio",
    logo: "/assets/img/clients/cluzstudio.png",
  },
  {
    href: "https://www.byt.bz/",
    name: "Byt",
    logo: "/assets/img/clients/byt.jpg",
  },
  {
    href: "https://lapenultimacasa.com/",
    name: "la Penultima Casa",
    logo: "/assets/img/clients/lpcasa.png",
  },
  {
    href: "https://smgbranding.net/",
    name: "Statamic",
    logo: "/assets/img/clients/smg.png",
  },
];

export default function Clients() {
  return (
    <div className="bg-white py-14 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-primary">
          Somos el <b> proveedor de hosting </b> de importantes agencias de
          desarrollo de software y servicios de consultoría
        </h2>
        <div className="mx-auto mt-10   max-w-lg   items-center gap-x-8 gap-y-10 sm:max-w-xl   sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Slider {...sliderSettings}>
            {clients.map((client) => (
              <div key={client.name} className="flex justify-center col-span-1">
                <Link href={client.href} target="_blank">
                  <Image
                    className="h-12 w-auto"
                    src={client.logo}
                    alt={client.name}
                    width={150}
                    height={150}
                  />
                  <span>
                    <span className="sr-only">{client.name}</span>
                  </span>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
