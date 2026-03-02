import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // Allow access to the login page without a token
            if (req.nextUrl.pathname.startsWith('/admin/login')) {
                return true;
            }
            // Require a token for all other /admin routes
            if (req.nextUrl.pathname.startsWith('/admin')) {
                return !!token;
            }
            return true;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*"],
};
