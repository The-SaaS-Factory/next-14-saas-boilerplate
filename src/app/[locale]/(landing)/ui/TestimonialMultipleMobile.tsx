/* eslint-disable no-undef */
"use client";

import { sliderSettingsTestimonials } from "@/lib/constants";
import Image from "next/image";

const testimonials: any[] = [
  {
    body: "Este servicio de hosting hizo que compartir mis recetas sea más fácil que nunca. La velocidad y estabilidad son impresionantes, y el equipo de soporte siempre está dispuesto a ayudar. ¡Una elección perfecta para cualquier amante de la cocina que desee tener un blog!",
    author: {
      name: "Laura G.",
      handle: "Entusiasta de la Cocina",
    },
    icon: (
      <Image
        src={"/assets/img/cuban-flag.jpg"}
        alt="Cuban Flag"
        width={20}
        height={20}
        className="inline"
      />
    ),
  },
  {
    body: "Desde que cambié a este servicio de hosting, mi sitio web nunca ha estado tan rápido y confiable. La atención personalizada es un gran plus, siempre me siento respaldada.",
    author: {
      name: "Fernanda V.   ",
      handle: "Emprendedora Online",
    },
    icon: (
      <Image
        src={"/assets/img/cuban-flag.jpg"}
        alt="Cuban Flag"
        width={20}
        height={20}
        className="inline"
      />
    ),
  },
  {
    body: "Realmente lo que más me impresionó fue que pude hacer el pago desde Cuba   y en CUP de manera sencilla Excelente!",
    author: {
      name: "Pablo R",
      handle: "Proprietário de Blog",
    },
    icon: (
      <Image
        src={"/assets/img/cuban-flag.jpg"}
        alt="Cuban Flag"
        width={20}
        height={20}
        className="inline"
      />
    ),
  },
  {
    body: "Mi tienda en línea ha experimentado un aumento notable en las ventas desde que opté por este hosting. La interfaz es amigable, y la asistencia técnica siempre está lista para ayudar. ¡Muy satisfecha con los resultados y el impacto en mi negocio!.",
    author: {
      name: "Lucía M. ",
      handle: " Tienda Online de Artesanías",
    },
    icon: (
      <Image
        src={"/assets/img/spain-flag.png"}
        alt="Cuban Flag"
        width={20}
        height={20}
        className="inline"
      />
    ),
  },
  {
    body: "Como fotógrafo aficionado, la presentación visual de mi sitio es crucial. Este hosting ha mejorado significativamente la velocidad de carga de mis imágenes. La atención al cliente es excepcional, ¡definitivamente recomendado para cualquier amante de la fotografía!",
    author: {
      name: "Javier L. ",
      handle: " Aficionado a la Fotografía",
    },
    icon: (
      <Image
        src={"/assets/img/usa-flag.jpg"}
        alt="Cuban Flag"
        width={30}
        height={30}
        className="inline"
      />
    ),
  },
];

import Slider from "react-slick";

export default function TestimonialMultipleMobile() {
  return (
    <div className=" w-full my-14 gap-7 space-x-3 max-w-sm   ">
      <Slider {...sliderSettingsTestimonials}>
        {testimonials.map((item, index) => (
          <div key={`slide${index}`} className="  mx-7 p-3    ">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                <p>{`“${item.body}”`}</p>
              </div>
              <div className="flex items-center gap-x-4 mt-4">
                <div>
                  <div className="font-semibold">{item.author?.name}</div>
                  <div className="text-gray-600 flex space-x-3 items-center">
                    <span>{item.author?.handle}</span>
                    <Image
                      src={item.icon.props.src}
                      alt={item.icon.props.alt}
                      width={20}
                      height={20}
                      className="inline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
