// middleware.js
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ✅ PUBLIC ROUTES (no login needed)
  publicRoutes: [
    "/",              // landing page
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/(.*)",      // keep API public for now
  ],
});

// ✅ Official Clerk matcher for App Router
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
