import { NextRequest, NextResponse } from "next/server";
import { localStorageMixins } from "./localStorage.mixins";

export function middleware(request: NextRequest) {
//   const access_token = request.cookies.get(`access_token`);
//   if (!access_token && !request.nextUrl.pathname.startsWith("/login")) {
//     return Response.redirect(new URL("/login", request.url));
//   }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
