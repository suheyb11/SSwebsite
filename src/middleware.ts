// Guards the dashboard. Nothing else needs intercepting.
//
// The public site is a plain set of routes under src/app/(site) — one language,
// no prefixes — so a request either belongs to /admin and needs a session, or
// it passes straight through.

import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The sign-in page has to stay reachable, or there is no way back in.
  if (pathname === "/admin/login") return NextResponse.next();

  const userId = await readSession(request.cookies.get(SESSION_COOKIE)?.value);
  if (userId) return NextResponse.next();

  const login = request.nextUrl.clone();
  login.pathname = "/admin/login";
  // Remember where they were headed so sign-in can return them there.
  login.searchParams.set("next", pathname);

  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
