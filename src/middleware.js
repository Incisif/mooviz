import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./utils/i18n";
import withAuth from "next-auth/middleware";

export function middleware(req) {
  const newLocaleUrl = getLocaleUrlToRedirect(req);

  if (newLocaleUrl) {
    return NextResponse.redirect(newLocaleUrl);
  }
  if (/\/[a-z]{2}\/user.*/.test(req.nextUrl.pathname)) {
    return withAuth(req);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
