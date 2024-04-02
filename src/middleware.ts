import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth: (auth, req) => {
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3123)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    let hostname = req.headers.get("host")!.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    

    // special case for Vercel preview deployment URLs
    if (hostname.includes("---") && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
      hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    
    // rewrites for app pages // Need auth.userId to be able to access app pages
    if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      console.log("here");
      
      if (!auth.userId && !auth.isPublicRoute) {
        const prefix = process.env.NODE_ENV === "development" ? "http://" : "https://";
        return redirectToSignIn({ returnBackUrl: `${prefix}${hostname}/` });
      }

      return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
    }

    // special case for `vercel.pub` domain
    //   if (hostname === 'vercel.pub') {
    //     return NextResponse.redirect(
    //       'https://vercel.com/blog/platforms-starter-kit',
    //     );
    //   }

    // rewrite root application to `/home` folder
    if (hostname === "localhost:3000" || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
      console.log("here22222");
      
      return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
    }
    // console.log("here");

    // rewrite everything else to `/[domain]/[slug] dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};