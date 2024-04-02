import {
  ArrowDownIcon,
  BoltIcon,
  ChatBubbleBottomCenterIcon,
  CodeBracketIcon,
  InboxIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "cPanel",
    description:
      "Te damos el acceso total a tu hosting donde gestionarás tus cuentas de correo, bases de datos, dominios y subdominios, aplicaciones instaladas, etc.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Copias de seguridad",
    description:
      "Realizamos copias de seguridad diarias de todos los sitios web alojados en nuestros servidores. Además, puedes realizar copias de seguridad de forma manual desde tu cPanel.",
    href: "#",
    icon: ArrowDownIcon,
  },
  {
    name: "SSL gratis",
    description:
      "Todos nuestros planes de hosting incluyen un certificado SSL gratis para que tu sitio web sea seguro y confiable.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Soporte 24/7",
    description:
      "Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana, los 365 días del año para ayudarte con cualquier problema que tengas.",
    href: "#",
    icon: ChatBubbleBottomCenterIcon,
  },
  {
    name: "Velocidad y estabilidad",
    description:
      "Nuestros servidores están optimizados para brindar la mejor velocidad y estabilidad a tu sitio web. Con discos SSD y memoria suficiente para correr cualquier sitio sin problemas.",
    href: "#",
    icon: BoltIcon,
  },
  {
    name: "Instalador de Wordpress",
    description:
      "Softaculous es un instalador de aplicaciones que te permite instalar Wordpress, Joomla, Drupal, Prestashop y más de 400 aplicaciones con un solo clic.",
    href: "#",
    icon: CodeBracketIcon,
  },
];

export default function Features1() {
  return (
    <div className="   bg-gradient-to-tr from-[#2d395f] to-[rgb(5,76,117)] py-24 sm:py-24">
      <div
        className="-mt-96   inset-x-0 z-0  transform-gpu overflow-hidden blur-3xl  "
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
             bg-gradient-to-tr from-[#8afcfc] to-[#14e4ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto   lg:pt-7 max-w-7xl z-10 relative lg:-mt-96 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ok, te interesan los Datos Técnicos: Mostramos la Excelencia en Resultados Prácticos
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
