import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// Middleware function to protect routes
export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  console.log("yo ho ma", token);
  const { pathname } = request.nextUrl;

  // Define protected routes that require authentication
  const protectedRoutes = ["/profile", "/add", "/admin"];

  // If token does not exist (user is not authenticated)
  if (!token) {
    // Check if the current path matches any of the protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      // Redirect to sign-in page if trying to access protected routes without authentication
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }

  // Allow the request to proceed if authenticated or accessing public routes
  return NextResponse.next();
}

// Define the paths to apply the middleware on
export const config = {
  matcher: [
    "/profile/:path*",
    "/", // Protect profile route
    "/add/:path*", // Protect add route
    "/admin/:path*", // Protect admin route
  ],
};
