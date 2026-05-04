import { TruckElectric } from "lucide-react";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware() {
        return NextResponse.next()

    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                if (
                    pathname.startsWith("/api/") ||
                    pathname.startsWith('/dashboard/')
                ) {
                    return true;
                }

                // public
                if (pathname === '/' || pathname === '/login' ||
                    pathname === '/register') {
                    return true;
                } 

                return !!token;
            }
        }
    }
)


export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)']
}