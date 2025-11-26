// middleware.js
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ✅ Routes that are public (no login required)
  publicRoutes: [
    "/",              // landing page
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/(.*)",      // keep public for now; tighten later if needed
  ],
});

// ✅ Official Clerk matcher for Next.js App Router
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
