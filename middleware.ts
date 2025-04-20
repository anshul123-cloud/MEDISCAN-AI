import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req:NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (!isAuth && !isLoginPage && !req.nextUrl.pathname.startsWith("/api")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"], // Add protected routes here
};


