import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    name: "Crea una organización para cada cliente",
    description:
      "Al separar los servicios, facturas y recursos por cliente te permite darle acceso de forma segura y rápida a tu cliente a que administre (Y pague, si quieres) sus recursos directamente. Esto le da seguridad al cliente y a ti profesionalidad y prácticidad sobre todo.",
  },
  {
    name: "Gana un 35% en cada nueva compra de servicio",
    description:
      "Obten un 35% de descuento en cada nuevo servicio que se compre desde una organización creada por tu agencia (Ya sea que el cliente tenga acceso o no)",
  },
  {
    name: "Soporte prioritario",
    description:
      "Soporte prioritario para ti y tus organizaciones. Directamente desde WhatsApp o correo electrónico.",
  },
];

export default function UpgradeToAgencySection() {
  return (
    <div className="bg-main relative isolate pt-1">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#92eef1] to-[#0c77cf] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="border-b border-gray-200 pb-10">
              <h2 className="font-medium text-gray-500">
                Conoce nuestra membresía para agencias
              </h2>
              <p className=" text-5xl font-bold tracking-tight text-primary sm:text-5xl  ">
                ¡Hazte agencia!
              </p>
            </div>

            <dl className="mt-10 space-y-10">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="text-subtitle">{feature.name}</dt>
                  <dd className="mt-3 text-primary">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
              <Image
                width={1000}
                height={1000}
                src="/assets/img/organizations.svg"
                alt="Organization System For agencies"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <Link href="/home/settings/billing/buyPlan" className="flex items-center mx-auto btn-icon animate-bounce">
              <span>¡Hazte agencia!</span>
              <ArrowRightCircleIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            {/* <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  width={1000}
                  height={1000}
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-09-detail-01.jpg"
                  alt="Detail of temperature setting button on kettle bass with digital degree readout."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  width={1000}
                  height={1000}
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-09-detail-02.jpg"
                  alt="Kettle spout pouring boiling water into coffee grounds in pour-over mug."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
