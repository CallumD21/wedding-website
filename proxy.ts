import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSessions } from "./app/lib/actions";

const PUBLIC_ROUTES = ['/login', '/']

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = PUBLIC_ROUTES.includes(path);

    const session = (await cookies()).get('session')?.value;
    const isValidSession = session ? (await getSessions(session)).length > 0 : false;

    if (!isPublicRoute && !isValidSession) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}