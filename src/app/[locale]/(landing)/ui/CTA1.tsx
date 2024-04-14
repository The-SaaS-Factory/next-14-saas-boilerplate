import BtnBuyService from "@/components/ui/commons/BtnBuyService";

export default function CTA1() {
  return (
    <div className="bg-white py-14" id="wordpress">
      <div className="mx-auto max-w-7xl  sm:px-6   lg:px-8">
        <div
          className="relative isolate overflow-hidden   bg-no-repeat lg:bg-repeat bg-cover lg:bg-contain  bg-gradient-to-tr from-[#5971c0] to-[#1165b3] px-6 py-20 text-left shadow-2xl sm:rounded-3xl  "
          style={{ backgroundImage: "url(/assets/img/cpanel3.png)" }}
        >
          <h2 className=" max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hosting especializado para un WordPress optimizado
          </h2>
          <p className="  mt-6 max-w-xl text-lg leading-8 text-gray-300">
            La rapidez con la que se carga tu WordPress es crucial para asegurar
            que tu sitio destaque en los primeros resultados de búsqueda de
            Google. Aprovecha las características de optimización de nuestro
            hosting de alta velocidad y supérate a la competencia.
          </p>
          <div className="mt-10 flex  gap-x-6">
            <BtnBuyService />
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
