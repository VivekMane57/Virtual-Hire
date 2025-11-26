// middleware.js
import { NextResponse } from "next/server";

export function middleware() {
  // just let every request pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
