export { default } from "next-auth/middleware"

// Apply NextAuth to all routes except login and signup
export const config = {
  matcher: [
    // Exclude root (login) and signup, apply to everything else
    // "/((?!$|signup).*)"
  ]
}