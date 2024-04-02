import Image from "next/image";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <>
      <main className="relative isolate h-full">
        <Image
          src="/assets/img/403.png"
          alt="403 error"
          width={450}
          height={450}
          className=" items-center justify-center mx-auto  "
        />
        <div className="mx-auto max-w-7xl px-6 py-3 text-center sm:py-7 lg:px-8">
          <p className="text-base font-semibold leading-8 text-primary">403</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
            Forbidden
          </h1>
          <p className="mt-4 text-base text-primary sm:mt-6">
            {`Sorry, you don't have access to this page`}.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/home"
              className="text-sm font-semibold leading-7 text-primary"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
