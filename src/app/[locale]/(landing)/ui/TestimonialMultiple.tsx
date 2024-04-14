import { classNames } from "@/utils/facades/serverFacades/strFacade";
import Image from "next/image";
import { Key } from "react";

export const featuredTestimonial = {
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam id praesentium mollitia, iusto libero quos alias expedita sit recusandae nulla quis consequatur facilis dolorem distinctio numquam accusantium unde quidem.",
  author: {
    name: "Laura G.",
    handle: "SEO Specialist",
  },
};

export const testimonials: any[] = [
  [
    [
      {
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam id praesentium mollitia, iusto libero quos alias expedita sit recusandae nulla quis consequatur facilis dolorem distinctio numquam accusantium unde quidem.",
        author: {
          name: "Fernanda V.   ",
          handle: "CTO at Gooogle",
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
    ],
    [
      {
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam id praesentium mollitia, iusto libero quos alias expedita sit recusandae nulla quis consequatur facilis dolorem distinctio numquam accusantium unde quidem.",
        author: {
          name: "Fernanda V.   ",
          handle: "CTO at Gooogle",
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
    ],
  ],
  [
    [
      {
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam id praesentium mollitia, iusto libero quos alias expedita sit recusandae nulla quis consequatur facilis dolorem distinctio numquam accusantium unde quidem.",
        author: {
          name: "Fernanda V.   ",
          handle: "CTO at Gooogle",
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
    ],
    [
      {
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam id praesentium mollitia, iusto libero quos alias expedita sit recusandae nulla quis consequatur facilis dolorem distinctio numquam accusantium unde quidem.",
        author: {
          name: "Fernanda V.   ",
          handle: "CTO at Gooogle",
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
    ],
  ],
];

export default function TestimonialMultiple() {
  return (
    <div className="relative isolate bg-white pb-32 pt-3 lg:pt-14  ">
      <div
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#3416bd] to-[#167891]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        aria-hidden="true"
      >
        <div
          className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#167891] to-[#1f6be4] xl:ml-0 xl:mr-[calc(50%-12rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
              </div>
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map(
                (column: any[], columnIdx: Key | null | undefined) => (
                  <div
                    key={columnIdx}
                    className={classNames(
                      (columnGroupIdx === 0 && columnIdx === 0) ||
                        (columnGroupIdx === testimonials.length - 1 &&
                          columnIdx === columnGroup.length - 1)
                        ? "xl:row-span-2"
                        : "xl:row-start-1",
                      "space-y-8"
                    )}
                  >
                    {column.map((testimonial) => (
                      <figure
                        key={testimonial.author.handle}
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                      >
                        <blockquote className="text-gray-900">
                          <p>{`“${testimonial.body}”`}</p>
                          {testimonial.icon && (
                            <div className="mt-6 flex items-center gap-x-4">
                              {testimonial.icon}
                            </div>
                          )}
                        </blockquote>

                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <div>
                            <div className="font-semibold">
                              {testimonial.author.name}
                            </div>
                            <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
