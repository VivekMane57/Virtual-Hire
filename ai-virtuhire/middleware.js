// ai-virtuhire/middleware.js
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ✅ routes that don't need auth
  publicRoutes: [
    "/",
    "/about",
    "/contactus",
    "/working",
    "/dashboard/resume",
    "/api/webhook(.*)",
  ],
});

// ✅ use ONLY non-capturing groups `(?:...)` in matcher
export const config = {
  matcher: [
    // apply middleware to everything except Next internals & static assets
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2)).*)",
    "/",
  ],
};
