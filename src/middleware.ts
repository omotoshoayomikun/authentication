import { NextRequest, NextResponse } from "next/server";

export function middleware (request: NextRequest) {
    // if(request.nextUrl.pathname === "/") {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }
}

// export const config = {
    // Match only internationalized pathnames
//   matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)',
//   ],
// }