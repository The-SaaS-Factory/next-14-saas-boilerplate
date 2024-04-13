import { unstable_cache } from "next/cache";
//import prisma from "./db";

export async function getSiteData(domain: string) {
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  //   : null;

  return await unstable_cache(
    async () => {
      return {};
      // return prisma.site.findUnique({
      //   where: subdomain ? { subdomain } : { customDomain: domain },
      //   include: { user: true },
      // });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    }
  )();
}

export async function getPostsForSite(domain: string) {
  console.log(domain);
  
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  //   : null;

  // return await unstable_cache(
  //   async () => {
  //     return prisma.post.findMany({
  //       where: {
  //         site: subdomain ? { subdomain } : { customDomain: domain },
  //         published: true,
  //       },
  //       select: {
  //         title: true,
  //         description: true,
  //         slug: true,
  //         image: true,
  //         createdAt: true,
  //       },
  //       orderBy: [
  //         {
  //           createdAt: "desc",
  //         },
  //       ],
  //     });
  //   },
  //   [`${domain}-posts`],
  //   {
  //     revalidate: 900,
  //     tags: [`${domain}-posts`],
  //   }
  // )();

  return [];
}

export async function getPostData(domain: string, slug: string) {
  console.log(domain);
  console.log(slug);
  // const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  //   ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
  //   : null;

  // return await unstable_cache(
  //   async () => {
  //     const data = await prisma.post.findFirst({
  //       where: {
  //         site: subdomain ? { subdomain } : { customDomain: domain },
  //         slug,
  //         published: true,
  //       },
  //       include: {
  //         site: {
  //           include: {
  //             user: true,
  //           },
  //         },
  //       },
  //     });

  //     if (!data) return null;

  //     const mdxSource: any = [];
  //     const adjacentPosts: any = [];

  //     return {
  //       ...data,
  //       mdxSource,
  //       adjacentPosts,
  //     };
  //   },
  //   [`${domain}-${slug}`],
  //   {
  //     revalidate: 900, // 15 minutes
  //     tags: [`${domain}-${slug}`],
  //   }
  // )();
  return {};
}
