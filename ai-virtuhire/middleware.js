import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",                   // Allow homepage without login
    "/about",
    "/contactus",
    "/resume",
    "/interview",
    "/working",
    "/api/webhook(.*)",
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and public static files
    "/((?!_next|favicon.ico|images|public|.*\\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2)).*)",
    "/(api|trpc)(.*)",
  ],
};
