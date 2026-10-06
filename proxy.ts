import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSessions } from "./app/lib/actions";
import { validateSession } from "./app/components/Login/LoginActions";

const LOGIN_PAGE = "/login";
const PUBLIC_ROUTES = [LOGIN_PAGE, "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const isLoginPage = path === LOGIN_PAGE;

  if (isPublicRoute && !isLoginPage) {
    return NextResponse.next();
  }

  const isValidSession = await validateSession();

  if (isValidSession) {
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/account", req.nextUrl));
    }
    return NextResponse.next();
  }

  return isLoginPage
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/login", req.nextUrl));
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
