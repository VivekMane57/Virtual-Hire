// middleware.js
import { authMiddleware } from "@clerk/nextjs";

// All routes are protected EXCEPT the ones in publicRoutes
export default authMiddleware({
  publicRoutes: [
    "/",              // landing page
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook(.*)" // keep any public webhooks here if you have them
  ],
});

export const config = {
  matcher: [
    // Apply Clerk to all routes except static assets and Next internals
    "/((?!_next|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf)).*)",
    "/(api|trpc)(.*)",
  ],
};
