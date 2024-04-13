import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
//import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/test",
    "/api/clerk",
    "/api/stripe",
    "/api/test",
    "/api/cron",
  ],
  afterAuth(auth, req) {
    const url = req.nextUrl;
    let hostname = req.headers
      .get("host")!
      .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    // if (
    //   auth.userId &&
    //   !auth.orgId &&
    //   req.nextUrl.pathname !== "/org-selection"
    // ) {
    //   const orgSelection = new URL("/org-selection", req.url);
    //   return NextResponse.redirect(orgSelection);
    // }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

    // rewrite root application to `/home` folder
    if (
      hostname === "localhost:3000" ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      return NextResponse.next();
    }
    // console.log("here");


    console.log("here-"+ hostname +''+ path);
    
    // rewrite everything else to `/[domain]/[slug] dynamic route
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
    // Allow users visiting public routes to access them
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
