import { NextRequest, NextResponse } from "next/server";

const protectedR = ["/passangers"];
export default function middleware(req: NextRequest) {
  if (protectedR.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
