import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow access to public pages
      if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/api/auth')) {
        return true;
      }

      // Require authentication for dashboard
      return !!token;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
