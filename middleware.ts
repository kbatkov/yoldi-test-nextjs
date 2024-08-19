import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { routes } from "@/_src/constants";
import { isProtectedRoute, isPublicRoute } from "@/_src/helpers";

import { decrypt } from "./app/_src/libs/session";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  // Get the session cookie from the request and decrypt it to get the session object.
  const sessionCookie = cookies().get("session")?.value;
  const session = await decrypt(sessionCookie);

  // If the user is trying to access a protected route and is not logged in, redirect them to the login page.
  if (isProtectedRoute(pathname) && !session?.userId) {
    return NextResponse.redirect(new URL(routes.login.path, nextUrl));
  }

  // If the user is trying to access a public route and is logged in, redirect them to the account page.
  // We don't want to redirect them to the account page if they are already on it.
  if (isPublicRoute(pathname) && session?.userId && !nextUrl.pathname.startsWith(routes.account.path)) {
    return NextResponse.redirect(new URL(routes.account.path, nextUrl));
  }

  // If none of the above conditions are met, continue with the request as usual.
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
