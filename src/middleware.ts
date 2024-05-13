import { NextRequest, NextResponse } from "next/server";
import { localUris } from "./utils/uris";
import { store } from "./redux/store";

const protectedRoutes = [localUris.passanger.index, localUris.driver.index];
export default function middleware(req: NextRequest) {
  const token = req.cookies.get("vesal-pwa-token");
  const role = req.cookies.get("vesal-pwa-role");
  // if not logged in
  if (
    !token?.value &&
    !role?.value &&
    protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteUrl = new URL(localUris.auth.login, req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  } else {
    if (req.nextUrl.pathname.startsWith(localUris.auth.login)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (req.nextUrl.pathname === "/") {
      switch (role?.value) {
        case "مسافر":
          return NextResponse.redirect(
            new URL(localUris.passanger.index, req.url)
          );
        case "راننده":
          return NextResponse.redirect(
            new URL(localUris.passanger.index, req.url)
          );
        default:
          break;
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      role?.value !== "مسافر" &&
      req.nextUrl.pathname.startsWith(localUris.passanger.index)
    ) {
      return NextResponse.redirect(new URL("/denid", req.url));
    }
    if (
      role?.value !== "راننده" &&
      req.nextUrl.pathname.startsWith(localUris.driver.index)
    ) {
      return NextResponse.redirect(new URL("/denid", req.url));
    }
  }
}
