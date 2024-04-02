import BtnBuyService from "@/components/ui/commons/BtnBuyService";
import {
  CurrencyDollarIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AgencyCTA() {
  return (
    <div className="relative overflow-hidden bg-white" id="agencies">
      {/* Decorative background image and gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
          <Image
            width={1318}
            height={752}
            src="/assets/img/agencies.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
      </div>

      {/* Callout */}
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="sale-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            La solución perfecta para las agencias: Organización y ganancias
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-xl text-gray-600">
            Descubre la solución definitiva diseñada exclusivamente para
            agencias: una combinación impecable de organización y generación de
            ganancias. Simplifica tus procesos y potencia tus resultados
            económicos con nuestra propuesta única. ¡Optimiza tu camino hacia el
            éxito con eficiencia y rentabilidad!
          </p>
        </div>
        <div className="flex mt-10">
          <BtnBuyService />
        </div>
      </section>

      {/* Testimonials */}
      <section
        aria-labelledby="testimonial-heading"
        className="relative mx-auto max-w-7xl px-4 py-14 pb-32 sm:px-6 lg:px- 2"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="  space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            <blockquote className="sm:flex lg:block">
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <div className="p-1 btn-icon  w-10 h-10 text-center flex">
                  <UsersIcon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-lg pt-3 text-gray-600">
                  Crea organizaciones (Perfiles) debajo de tu cuenta principal
                  para cada uno de tus clientes. Así podrás gestionar sus
                  servicios de hosting de manera independiente y personalizada.{" "}
                </p>
              </div>
            </blockquote>
            <blockquote className="sm:flex lg:block">
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <div className="p-1 btn-icon  w-10 h-10 text-center flex">
                  <CurrencyDollarIcon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-lg pt-3 text-gray-600">
                  Recibe ganancias por cada nuevo servicio comprado desde una
                  orgnización (Perfil) creada por ti. Hablamos de un 35% que se
                  suma a tu cuenta principal o se aplica como descuento en las
                  facturas de tus clientes.{" "}
                </p>
              </div>
            </blockquote>
            <blockquote className="sm:flex lg:block">
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <div className="p-1 btn-icon  w-10 h-10 text-center flex">
                  <KeyIcon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-lg pt-3 text-gray-600">
                  Cuando creas una organización (Perfil) para un cliente, puedes
                  añadirle miembros para que colaboren en la gestión de los
                  servicios. De esta forma tu cliente puede tener acceso y
                  dominio total de su servicio.{" "}
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
