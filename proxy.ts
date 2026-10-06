import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSessions } from "./app/lib/actions";

const LOGIN_PAGE = "/login";
const PUBLIC_ROUTES = [LOGIN_PAGE, "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const isLoginPage = path === LOGIN_PAGE;

  if (isPublicRoute && !isLoginPage) {
    return NextResponse.next();
  }

  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return isLoginPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const sessions = await getSessions(session);
  const isValidSession = sessions.length > 0;
  const isSessionExpired = isValidSession
    ? sessions[0].expiryDate < new Date()
    : true;

  if (!isValidSession || isSessionExpired) {
    deleteSession(session);
    (await cookies()).delete("session");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return isLoginPage
    ? NextResponse.redirect(new URL("/account", req.nextUrl))
    : NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
