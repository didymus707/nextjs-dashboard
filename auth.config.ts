import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // NextAuth requires a providers array; include an empty any-typed array
  // here when providers are configured elsewhere or will be added later.
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard"), nextUrl);
      }
    },
  },
  providers: [] as any,
} satisfies NextAuthConfig;
