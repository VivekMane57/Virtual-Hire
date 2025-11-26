// middleware.js at project root (ai-virtuhire/middleware.js)
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // pages that do NOT require login
  publicRoutes: [
    "/",                // landing page
    "/api/webhook(.*)", // keep if you use webhooks
  ],
});

// This matcher is directly from Clerk docs – no invalid capture groups.
export const config = {
  matcher: [
    // run middleware for all paths except static files and _next
    "/((?!.+\\.[\\w]+$|_next).*)",
    // always run for API routes
    "/(api|trpc)(.*)",
  ],
};
