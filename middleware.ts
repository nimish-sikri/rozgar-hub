import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_LOGOUT_REDIRECT,
    ROOT_PATH,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    adminRoutes
} from '@/routes'
import { NextResponse } from "next/server";
import { getCurrentUser } from "./lib/auth";
import { getTwoFactorTokenByEmail } from "./data/two-factor-token";


//@ts-ignore
const { auth } = NextAuth(authConfig)
 
//@ts-ignore
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);


    if(isApiAuthRoute){
        return null;
    }


    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (nextUrl.pathname === '/'){
      return Response.redirect(new URL('/home', nextUrl));
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl));
    }

})
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}