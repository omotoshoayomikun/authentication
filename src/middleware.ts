import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../lib/session";

export async function middleware (request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await verifyToken(request);
    if (!session) return NextResponse.redirect(new URL("/", request.url));
        NextRequest.user = session;

        if(pathname === `/pass-code/${session.userId}` || pathname === `/pass-option/${session.userId}`) {
            if(session.stage !== "stage1") return NextResponse.redirect(new URL("/", request.url));
        }

        NextResponse.next()


}

export const config = {
    matcher: ['/pass-code/:path*', '/pass-option/:path*'],
  };